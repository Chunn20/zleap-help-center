'use client';

import { SearchResultItem } from './SearchResultItem';
import { FileQuestion } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  content: string;
  breadcrumb?: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
}

export function SearchResults({ results, query, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00]"></div>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12">
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FileQuestion className="h-16 w-16 mb-4" />
          <p className="text-lg">请输入关键词开始搜索</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12">
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FileQuestion className="h-16 w-16 mb-4" />
          <p className="text-lg">暂无相关结果</p>
          <p className="text-sm mt-2">试试其他关键词吧</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      {/* 结果统计 */}
      <div className="mb-6 text-gray-600">
        为你找到与 <span className="font-semibold text-gray-900">"{query}"</span> 相关结果共{' '}
        <span className="font-semibold text-[#FF8A00]">{results.length}</span> 条
      </div>

      {/* 结果列表 */}
      <div className="space-y-4">
        {results.map((result) => (
          <SearchResultItem
            key={result.id}
            title={result.title}
            url={result.url}
            content={result.content}
            breadcrumb={result.breadcrumb}
            query={query}
          />
        ))}
      </div>
    </div>
  );
}
