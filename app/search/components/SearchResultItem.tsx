'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { SearchResultPathSegment } from './types';

interface SearchResultItemProps {
  titleHtml: string;
  url: string;
  contentHtml: string;
  contentUrl: string;
  pathSegments: SearchResultPathSegment[];
  query: string;
}

export function SearchResultItem({
  titleHtml,
  url,
  contentHtml,
  contentUrl,
  pathSegments,
  query,
}: SearchResultItemProps) {
  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlightText = (text: string, keyword: string) => {
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

  return (
    <article >
      <Link
        href={url}
        className="mb-4 block text-[30px] font-semibold leading-[1.35] text-[#1d1f26] transition-color [&_mark]:bg-transparent [&_mark]:px-0 [&_mark]:text-[#2563eb]"
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
      {pathSegments.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-[#97a1b7]">
          {pathSegments.map((segment, index) => (
            <div key={`${segment.label}-${index}`} className="flex items-center gap-2">
              {segment.href ? (
                <Link
                  href={segment.href}
                  className="max-w-full transition-colors hover:text-[#2563eb]"
                  dangerouslySetInnerHTML={{ __html: segment.label }}
                />
              ) : (
                <span className="max-w-full" dangerouslySetInnerHTML={{ __html: segment.label }} />
              )}
              {index < pathSegments.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-[#c2c8d6]" />
              )}
            </div>
          ))}
        </div>
      )}
      <Link
        href={contentUrl}
        className="line-clamp-2 text-[17px] leading-8 text-[#333a49] [&_mark]:bg-transparent [&_mark]:px-0 [&_mark]:font-medium [&_mark]:text-[#2563eb]"
        dangerouslySetInnerHTML={{
          __html:
            contentHtml ||
            highlightText('当前结果未提供更多正文摘要。', query),
        }}
      />
    </article>
  );
}
