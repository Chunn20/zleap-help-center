'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { SearchBox } from './components/SearchBox';
import { SearchResults } from './components/SearchResults';
import type { SearchResult } from './components/types';
import type { SearchResultPathSegment } from './components/types';
import { HelpCenterHeader } from '@/app/components/HelpCenterHeader';
import { HelpCenterFooter } from '@/app/components/HelpCenterFooter';

interface RawSearchResult {
  id: string;
  type: 'page' | 'heading' | 'text';
  url: string;
  content: string;
  breadcrumbs?: string[];
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuery(queryParam);
    if (queryParam) {
      void performSearch(queryParam);
    } else {
      setResults([]);
    }
  }, [queryParam]);

  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').trim();

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const highlightPlainText = (text: string, keyword: string) => {
    const normalized = keyword.trim();
    if (!normalized) return text;

    const terms = Array.from(
      new Set(
        normalized
          .split(/\s+/)
          .map((term) => term.trim())
          .filter(Boolean)
      )
    );

    if (terms.length === 0) return text;

    return text.replace(
      new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi'),
      '<mark>$1</mark>'
    );
  };

  const createSnippet = (html: string, keyword: string) => {
    const SNIPPET_CHARS = 72;
    const CONTEXT_CHARS = 22;

    if (!html) return '';

    const parsedChars: Array<{ char: string; marked: boolean }> = [];
    const markRegex = /<mark>(.*?)<\/mark>/gi;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    const pushText = (value: string, marked: boolean) => {
      const plain = stripHtml(value);
      for (const char of plain) {
        parsedChars.push({ char, marked });
      }
    };

    while ((match = markRegex.exec(html)) !== null) {
      pushText(html.slice(lastIndex, match.index), false);
      pushText(match[1], true);
      lastIndex = match.index + match[0].length;
    }

    pushText(html.slice(lastIndex), false);

    if (parsedChars.length <= SNIPPET_CHARS) {
      let result = '';
      let index = 0;
      while (index < parsedChars.length) {
        const currentMarked = parsedChars[index].marked;
        let chunk = '';
        while (index < parsedChars.length && parsedChars[index].marked === currentMarked) {
          chunk += parsedChars[index].char;
          index += 1;
        }
        result += currentMarked
          ? `<mark>${escapeHtml(chunk)}</mark>`
          : escapeHtml(chunk);
      }
      return result;
    }

    const firstMarkedIndex = parsedChars.findIndex((item) => item.marked);
    const plainText = parsedChars.map((item) => item.char).join('');
    const normalizedKeyword = stripHtml(keyword).toLowerCase().replace(/\s+/g, '');
    const lowercasePlainText = plainText.toLowerCase();
    const fallbackCharIndex =
      normalizedKeyword.length > 0
        ? Array.from(new Set(normalizedKeyword.split(''))).reduce((best, char) => {
            const index = lowercasePlainText.indexOf(char);
            if (index === -1) return best;
            if (best === -1) return index;
            return Math.min(best, index);
          }, -1)
        : -1;

    const anchorIndex =
      firstMarkedIndex !== -1
        ? firstMarkedIndex
        : fallbackCharIndex !== -1
          ? fallbackCharIndex
          : 0;

    let start = Math.max(0, anchorIndex - CONTEXT_CHARS);
    let end = Math.min(parsedChars.length, start + SNIPPET_CHARS);

    if (end - start < SNIPPET_CHARS) {
      start = Math.max(0, end - SNIPPET_CHARS);
    }

    const visibleChars = parsedChars.slice(start, end);
    let snippet = start > 0 ? '...' : '';
    let index = 0;

    while (index < visibleChars.length) {
      const currentMarked = visibleChars[index].marked;
      let chunk = '';

      while (index < visibleChars.length && visibleChars[index].marked === currentMarked) {
        chunk += visibleChars[index].char;
        index += 1;
      }

      snippet += currentMarked
        ? `<mark>${escapeHtml(chunk)}</mark>`
        : escapeHtml(chunk);
    }

    if (end < parsedChars.length) {
      snippet += '...';
    }

    return snippet;
  };

  const normalizeResults = (items: RawSearchResult[], currentQuery: string) => {
    const normalizedQuery = stripHtml(currentQuery).toLowerCase().replace(/\s+/g, '');
    const queryChars = Array.from(new Set(normalizedQuery.split('').filter(Boolean)));

    const ensureHighlighted = (value: string) => {
      if (value.includes('<mark>')) return value;
      return highlightPlainText(value, currentQuery);
    };

    const isOrderedSubsequence = (text: string, pattern: string) => {
      let patternIndex = 0;

      for (const char of text) {
        if (char === pattern[patternIndex]) {
          patternIndex += 1;
          if (patternIndex === pattern.length) return true;
        }
      }

      return pattern.length === 0;
    };

    const getMatchMeta = (value: string, kind: 'title' | 'description') => {
      const normalizedText = stripHtml(value).toLowerCase().replace(/\s+/g, '');

      if (!normalizedText || !normalizedQuery) {
        return {
          bucket: 99,
          score: 0,
          isMatch: false,
        };
      }

      if (normalizedText === normalizedQuery) {
        return {
          bucket: kind === 'title' ? 0 : 1,
          score: kind === 'title' ? 5000 : 4200,
          isMatch: true,
        };
      }

      if (normalizedText.includes(normalizedQuery)) {
        return {
          bucket: kind === 'title' ? 0 : 1,
          score: (kind === 'title' ? 4200 : 3400) - normalizedText.indexOf(normalizedQuery),
          isMatch: true,
        };
      }

      const matchedChars = queryChars.filter((char) => normalizedText.includes(char));
      const coverage = queryChars.length > 0 ? matchedChars.length / queryChars.length : 0;

      if (coverage <= 0) {
        return {
          bucket: 99,
          score: 0,
          isMatch: false,
        };
      }

      const orderedBonus = isOrderedSubsequence(normalizedText, normalizedQuery) ? 120 : 0;

      return {
        bucket: kind === 'title' ? 2 : 3,
        score:
          Math.round(coverage * (kind === 'title' ? 1800 : 1200)) + orderedBonus,
        isMatch: true,
      };
    };

    const groups = new Map<
      string,
      {
        page?: RawSearchResult;
        headings: RawSearchResult[];
        texts: RawSearchResult[];
      }
    >();

    items.forEach((item) => {
      const baseUrl = item.url.split('#')[0];
      const existing = groups.get(baseUrl) ?? {
        headings: [],
        texts: [],
      };

      if (item.type === 'page') {
        existing.page = item;
      } else if (item.type === 'heading') {
        existing.headings.push(item);
      } else {
        existing.texts.push(item);
      }

      groups.set(baseUrl, existing);
    });

    const output: Array<SearchResult & { bucket: number; rankScore: number }> = [];

    groups.forEach((group, baseUrl) => {
      const page = group.page ?? {
        id: baseUrl,
        type: 'page' as const,
        url: baseUrl,
        content: baseUrl.split('/').filter(Boolean).at(-1) ?? '无标题',
        breadcrumbs: [],
      };

      const titleCandidates = [page, ...group.headings].map((item) => ({
        item,
        ...getMatchMeta(item.content, 'title'),
      }));

      const descriptionCandidates = [...group.texts, ...group.headings].map((item) => ({
        item,
        ...getMatchMeta(item.content, 'description'),
      }));

      const bestTitleCandidate =
        titleCandidates
          .filter((candidate) => candidate.isMatch)
          .sort((a, b) => a.bucket - b.bucket || b.score - a.score)[0] ??
        {
          item: page,
          bucket: 99,
          score: 0,
          isMatch: false,
        };

      const bestDescriptionCandidate =
        descriptionCandidates
          .filter((candidate) => candidate.isMatch)
          .sort((a, b) => a.bucket - b.bucket || b.score - a.score)[0] ??
        null;

      const primaryBucket = Math.min(
        bestTitleCandidate.bucket,
        bestDescriptionCandidate?.bucket ?? 99
      );

      if (primaryBucket === 99) return;

      const pageTitleHtml = ensureHighlighted(page.content);
      const titleItem = bestTitleCandidate.item;
      const titleHtml = ensureHighlighted(titleItem.content);
      const descriptionItem = bestDescriptionCandidate?.item;
      const contentHtml = descriptionItem
        ? createSnippet(ensureHighlighted(descriptionItem.content), currentQuery)
        : '';

      const pathSegments: SearchResultPathSegment[] = [
        ...(page.breadcrumbs ?? []).map((label) => ({ label })),
        {
          label: stripHtml(pageTitleHtml),
          href: page.url.split('#')[0],
        },
        ...(titleItem.type === 'heading' &&
        stripHtml(titleHtml) !== stripHtml(pageTitleHtml)
          ? [
              {
                label: stripHtml(titleHtml),
                href: titleItem.url,
              },
            ]
          : []),
      ];

      output.push({
        id: page.id || baseUrl,
        titleHtml,
        url: titleItem.url || page.url || baseUrl,
        contentHtml,
        contentUrl: descriptionItem?.url || titleItem.url || page.url || baseUrl,
        pathSegments,
        bucket: primaryBucket,
        rankScore:
          bestTitleCandidate.score * 2 + (bestDescriptionCandidate?.score ?? 0),
      });
    });

    return output
      .sort((a, b) => a.bucket - b.bucket || b.rankScore - a.rankScore)
      .map(({ bucket: _bucket, rankScore: _rankScore, ...result }) => result);
  };

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      const resultsArray: RawSearchResult[] = Array.isArray(data)
        ? data
        : (data.data ?? []);

      setResults(normalizeResults(resultsArray, searchQuery));
    } catch (error) {
      console.error('搜索失败:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery) {
      performSearch(newQuery);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f8f8ff]">
      <div
        className="relative z-10 flex flex-1 flex-col overflow-hidden"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: '100% 100%',
        }}
      >
        <HelpCenterHeader />

        <div className="relative z-10 px-6 pt-16 pb-4">
          <SearchBox initialQuery={query} onSearch={handleSearch} />
        </div>

        <div className="relative z-10 flex-1 px-6 pb-24">
          <SearchResults results={results} query={query} isLoading={isLoading} />
        </div>
      </div>

      <div className="relative z-10 mt-auto bg-white">
        <HelpCenterFooter />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00]"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
