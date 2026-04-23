'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SearchResultItemProps {
  title: string;
  url: string;
  content: string;
  breadcrumb?: string[];
  query: string;
}

export function SearchResultItem({ title, url, content, breadcrumb, query }: SearchResultItemProps) {
  // 高亮关键词
  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;

    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Link
      href={url}
      className="block p-6 rounded-xl border border-gray-100 hover:border-[#FF8A00] hover:shadow-md transition-all bg-white"
    >
      {/* 面包屑 */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          {breadcrumb.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{crumb}</span>
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 标题 */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-[#FF8A00] transition-colors">
        {highlightText(title, query)}
      </h3>

      {/* 摘要 */}
      <p className="text-gray-600 line-clamp-2 leading-relaxed">
        {highlightText(content, query)}
      </p>
    </Link>
  );
}
