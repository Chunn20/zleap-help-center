'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { SearchBox } from './components/SearchBox';
import { SearchResults } from './components/SearchResults';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  content: string;
  breadcrumb?: string[];
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
      performSearch(queryParam);
    } else {
      setResults([]);
    }
  }, [queryParam]);

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

      // API 直接返回数组，不是 { data: [...] } 格式
      const resultsArray = Array.isArray(data) ? data : (data.data || []);

      // 按页面分组，每个页面只保留最相关的一条结果
      const pageMap = new Map<string, any>();

      resultsArray.forEach((item: any) => {
        const pageUrl = item.url?.split('#')[0] || item.url; // 移除锚点

        // 优先保留 type="page" 的结果，其次是 heading，最后是 text
        const existing = pageMap.get(pageUrl);
        if (!existing ||
            (item.type === 'page' && existing.type !== 'page') ||
            (item.type === 'heading' && existing.type === 'text')) {
          pageMap.set(pageUrl, item);
        }
      });

      // 转换搜索结果格式
      const formattedResults: SearchResult[] = Array.from(pageMap.values()).map((item: any) => {
        // 从 URL 中提取页面标题作为 breadcrumb
        const urlParts = item.url?.split('/').filter(Boolean) || [];
        const breadcrumb = urlParts.slice(1).map((part: string) => {
          // 移除锚点
          return part.split('#')[0];
        }).filter(Boolean);

        return {
          id: item.id || item.url,
          title: item.content || '无标题',
          url: item.url || '#',
          content: item.content || '暂无描述',
          breadcrumb: breadcrumb,
        };
      });

      setResults(formattedResults);
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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部背景区域 */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        {/* 背景图 */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/background.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white"></div>

        {/* 导航栏 */}
        <div className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Zleap"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-semibold text-gray-900">智跃</span>
              <span className="text-xl text-gray-400">|</span>
              <span className="text-base text-gray-900">帮助中心</span>
            </Link>
          </div>
        </div>

        {/* 搜索区域 */}
        <div className="relative z-10 px-6 py-16">
          <SearchBox initialQuery={query} onSearch={handleSearch} />
        </div>
      </div>

      {/* 搜索结果区域 */}
      <div className="px-6 pb-20">
        <SearchResults results={results} query={query} isLoading={isLoading} />
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
