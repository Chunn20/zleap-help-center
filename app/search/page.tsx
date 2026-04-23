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

  const normalizeResults = (items: RawSearchResult[], currentQuery: string) => {
    const output: SearchResult[] = [];
    let currentPage: RawSearchResult | null = null;
    let currentDescription: RawSearchResult | null = null;

    const pushCurrentPage = () => {
      if (!currentPage) return;

      const baseUrl = currentPage.url.split('#')[0];
      const pageTitleHtml =
        currentPage.content ||
        highlightPlainText(
          baseUrl.split('/').filter(Boolean).at(-1) ?? '无标题',
          currentQuery
        );

      const breadcrumbLabels = currentPage.breadcrumbs ?? [];
      const pathSegments: SearchResultPathSegment[] = [
        ...breadcrumbLabels.map((label) => ({
          label,
        })),
        {
          label: stripHtml(pageTitleHtml),
          href: baseUrl,
        },
      ];

      output.push({
        id: currentPage.id || baseUrl,
        titleHtml: pageTitleHtml,
        url: baseUrl,
        contentHtml: currentDescription?.content || '',
        contentUrl: currentDescription?.url || baseUrl,
        pathSegments,
      });
    };

    items.forEach((item) => {
      if (item.type === 'page') {
        pushCurrentPage();
        currentPage = item;
        currentDescription = null;
        return;
      }

      if (currentPage && !currentDescription) {
        currentDescription = item;
      }
    });

    pushCurrentPage();

    return output;
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
