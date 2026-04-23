'use client';

import { SearchResultItem } from './SearchResultItem';
import { FileQuestion } from 'lucide-react';
import type { SearchResult } from './types';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
}

export function SearchResults({ results, query, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mx-auto mt-10 w-full max-w-4xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF8A00]"></div>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="mx-auto mt-10 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center rounded-[28px]  px-8 py-16 text-gray-600">
          <FileQuestion className="mb-4 h-16 w-16" />
          <p className="text-lg">请输入关键词开始搜索</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mx-auto mt-10 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center rounded-[28px]  px-8 py-16 text-gray-600">
          <FileQuestion className="mb-4 h-16 w-16" />
          <p className="text-lg">暂无相关结果</p>
          <p className="text-sm mt-2">试试其他关键词吧</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-4xl">
      <div className="mb-8 px-2 text-[15px] text-[#8c94a8]">
        为你找到“<span className="font-semibold text-[#5f6b85]">{query}</span>”相关结果共{' '}
        <span className="font-semibold text-[#5f6b85]">{results.length}</span> 条
      </div>

      <div className="space-y-5">
        {results.map((result) => (
          <SearchResultItem
            key={result.id}
            titleHtml={result.titleHtml}
            url={result.url}
            contentHtml={result.contentHtml}
            contentUrl={result.contentUrl}
            pathSegments={result.pathSegments}
            query={query}
          />
        ))}
      </div>
    </div>
  );
}
