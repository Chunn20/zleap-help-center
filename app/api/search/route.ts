import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

const searchServer = createFromSource(source, {
  tokenizer: createTokenizer(),
  search: {
    threshold: 0,
    tolerance: 0,
  },
});

interface SearchResultItem {
  id: string;
  type: 'page' | 'heading' | 'text';
  content: string;
  url: string;
  breadcrumbs?: string[];
}

function normalizeQuery(value: string) {
  return value.trim();
}

function uniqueChars(value: string) {
  return Array.from(new Set(value.replace(/\s+/g, '').split('').filter(Boolean)));
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

  return Array.from(merged.values());
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
