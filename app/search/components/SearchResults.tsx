'use client';

import { FileQuestion } from 'lucide-react';
import { SearchResultItem } from './SearchResultItem';
import { Pagination } from './Pagination';
import type { SearchResult } from './types';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function SearchResults({
  results,
  query,
  isLoading,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mx-auto mt-10 w-full max-w-4xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF8A00]"></div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mx-auto mt-10 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center rounded-[28px] px-8 py-16 text-gray-600">
          <FileQuestion className="mb-4 h-16 w-16" />
          <p className="text-lg">暂无相关结果</p>
          <p className="mt-2 text-sm">试试其他关键词吧</p>
        </div>
      </div>
    );
  }

  // 计算分页
  const totalPages = Math.ceil(results.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = results.slice(startIndex, endIndex);

  return (
    <div className="mx-auto mt-6 w-full max-w-4xl">
      <div className="mb-8 text-[15px] text-[#8F959E]">
        为你找到&quot;<span>{query}</span>&quot;相关结果共{' '}
        <span>{results.length}</span> 条
      </div>
      <div className="space-y-12">
        {paginatedResults.map((result) => (
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

      {/* 分页器 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
