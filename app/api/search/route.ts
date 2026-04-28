import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

const searchOptions = {
  components: {
    tokenizer: createTokenizer(),
  },
  search: {
    threshold: 0,
    tolerance: 0,
  },
};

const searchServer = createFromSource(source, {
  ...searchOptions,
  localeMap: {
    cn: searchOptions,
  },
});

interface SearchResultItem {
  id: string;
  type: 'page' | 'heading' | 'text';
  content: string;
  url: string;
  breadcrumbs?: string[];
}

interface StructuredDataContent {
  heading: string | undefined;
  content: string;
}

interface SearchPageData {
  structuredData?: {
    contents?: StructuredDataContent[];
  };
}

function normalizeQuery(value: string) {
  return value.trim();
}

function uniqueChars(value: string) {
  return Array.from(new Set(value.replace(/\s+/g, '').split('').filter(Boolean)));
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getHighlightTerms(content: string, query: string) {
  const normalizedQuery = stripHtml(query).toLowerCase().replace(/\s+/g, '');
  if (!normalizedQuery) return [];

  const normalizedContent = content.toLowerCase();
  const terms = new Set<string>();

  query
    .split(/\s+/)
    .map((term) => stripHtml(term).toLowerCase())
    .filter(Boolean)
    .forEach((term) => {
      if (normalizedContent.includes(term)) {
        terms.add(term);
      }
    });

  if (normalizedContent.includes(normalizedQuery)) {
    terms.add(normalizedQuery);
  }

  for (let length = normalizedQuery.length - 1; length >= 2; length -= 1) {
    for (let start = 0; start <= normalizedQuery.length - length; start += 1) {
      const term = normalizedQuery.slice(start, start + length);
      if (normalizedContent.includes(term)) {
        terms.add(term);
      }
    }
  }

  if (terms.size === 0) {
    uniqueChars(normalizedQuery)
      .map((char) => char.toLowerCase())
      .filter((char) => normalizedContent.includes(char))
      .forEach((char) => terms.add(char));
  }

  return Array.from(terms).sort((a, b) => b.length - a.length);
}

function highlightContent(content: string, query: string) {
  const plainContent = stripHtml(content);
  const terms = getHighlightTerms(plainContent, query);
  if (terms.length === 0) return escapeHtml(plainContent);

  const lowerContent = plainContent.toLowerCase();
  const ranges: Array<{ start: number; end: number }> = [];

  terms.forEach((term) => {
    let start = lowerContent.indexOf(term);

    while (start !== -1) {
      const end = start + term.length;
      const hasOverlap = ranges.some(
        (range) => start < range.end && end > range.start
      );

      if (!hasOverlap) {
        ranges.push({ start, end });
      }

      start = lowerContent.indexOf(term, start + term.length);
    }
  });

  ranges.sort((a, b) => a.start - b.start);

  let highlighted = '';
  let cursor = 0;

  ranges.forEach((range) => {
    highlighted += escapeHtml(plainContent.slice(cursor, range.start));
    highlighted += `<mark>${escapeHtml(plainContent.slice(range.start, range.end))}</mark>`;
    cursor = range.end;
  });

  highlighted += escapeHtml(plainContent.slice(cursor));

  return highlighted;
}

function highlightResults(items: SearchResultItem[], query: string) {
  return items.map((item) => ({
    ...item,
    content: highlightContent(item.content, query),
  }));
}

function getBaseUrl(url: string) {
  return url.split('#')[0];
}

function getHash(url: string) {
  const hash = url.split('#')[1];
  return hash ? decodeURIComponent(hash) : undefined;
}

function getPageContentByHeading() {
  const map = new Map<string, Map<string, string[]>>();
  const pages = source.getPages() as Array<{ url: string; data: SearchPageData }>;

  pages.forEach((page) => {
    const contents = page.data.structuredData?.contents;
    if (!contents) return;

    const contentByHeading = new Map<string, string[]>();

    contents.forEach((item) => {
      if (!item.heading || !item.content.trim()) return;

      const existing = contentByHeading.get(item.heading) ?? [];
      existing.push(item.content.trim());
      contentByHeading.set(item.heading, existing);
    });

    if (contentByHeading.size > 0) {
      map.set(getBaseUrl(page.url), contentByHeading);
    }
  });

  return map;
}

const pageContentByHeading = getPageContentByHeading();

function createHeadingContextResult(item: SearchResultItem): SearchResultItem | null {
  if (item.type !== 'heading') return null;

  const baseUrl = getBaseUrl(item.url);
  const heading = getHash(item.url);
  if (!heading) return null;

  const content = pageContentByHeading
    .get(baseUrl)
    ?.get(heading)
    ?.slice(0, 3)
    .join(' ')
    .trim();

  if (!content) return null;

  return {
    id: `${item.id}:context`,
    type: 'text',
    content,
    url: item.url,
    breadcrumbs: item.breadcrumbs,
  };
}

function addHeadingContextFallbacks(items: SearchResultItem[]) {
  const groups = new Map<
    string,
    {
      hasText: boolean;
      headings: SearchResultItem[];
    }
  >();

  items.forEach((item) => {
    const baseUrl = getBaseUrl(item.url);
    const group = groups.get(baseUrl) ?? {
      hasText: false,
      headings: [],
    };

    if (item.type === 'text') {
      group.hasText = true;
    } else if (item.type === 'heading') {
      group.headings.push(item);
    }

    groups.set(baseUrl, group);
  });

  groups.forEach((group) => {
    if (group.hasText) return;

    const contextResult = group.headings
      .map(createHeadingContextResult)
      .find((result): result is SearchResultItem => Boolean(result));

    if (contextResult) {
      items.push(contextResult);
    }
  });
}

async function searchWithFallback(query: string) {
  const primary = (await searchServer.search(query, {
    limit: 80,
  })) as SearchResultItem[];

  const merged = new Map<string, SearchResultItem>();

  primary.forEach((item) => {
    merged.set(item.id, item);
  });

  const chars = uniqueChars(query);

  if (chars.length > 1) {
    const fallbackGroups = await Promise.all(
      chars.map(async (char) => {
        return (await searchServer.search(char, {
          limit: 20,
        })) as SearchResultItem[];
      })
    );

    fallbackGroups.flat().forEach((item) => {
      if (!merged.has(item.id)) {
        merged.set(item.id, item);
      }
    });
  }

  const results = Array.from(merged.values());
  addHeadingContextFallbacks(results);

  return highlightResults(results, query);
}

export async function GET(request: Request) {
  const query = normalizeQuery(
    new URL(request.url).searchParams.get('query') ?? ''
  );

  if (!query) {
    return Response.json([]);
  }

  const results = await searchWithFallback(query);
  return Response.json(results);
}
