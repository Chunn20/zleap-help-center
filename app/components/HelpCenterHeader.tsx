'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { searchableDocs } from '@/app/search/search-data';

const SEARCH_HISTORY_KEY = 'zleap-help-center-search-history';
const MAX_SEARCH_HISTORY = 8;

interface HelpCenterHeaderProps {
  hideSearch?: boolean;
}

export function HelpCenterHeader({ hideSearch = false }: HelpCenterHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof searchableDocs>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const saveSearchHistory = (keyword: string) => {
    const normalized = keyword.trim();
    if (!normalized) return;

    setSearchHistory((current) => {
      const next = [
        normalized,
        ...current.filter((item) => item !== normalized),
      ].slice(0, MAX_SEARCH_HISTORY);

      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = searchableDocs
        .filter(
          (doc) =>
            doc.title.toLowerCase().includes(query.toLowerCase()) ||
            doc.keywords.some((keyword) =>
              keyword.toLowerCase().includes(query.toLowerCase())
            )
        )
        .slice(0, 8);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(searchHistory.length > 0);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setSearchHistory(
          parsed.filter((item): item is string => typeof item === 'string').slice(0, MAX_SEARCH_HISTORY)
        );
      }
    } catch {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/search')) {
      const query = new URLSearchParams(window.location.search).get('q') ?? '';
      setSearchQuery(query);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (pathname.startsWith('/docs')) {
      setSearchQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      saveSearchHistory(searchQuery);
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (keyword: string) => {
    saveSearchHistory(keyword);
    setShowSuggestions(false);
    setSearchQuery(keyword);
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex max-w-full items-center justify-between gap-8 px-8 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Zleap" className="h-10 rounded" />
            <span className="text-xl font-weight-500 font-bold text-gray-900">智跃</span>
          </Link>
          <span className="text-base text-gray-900 border-l border-solid border-gray-400 pl-3">帮助中心</span>
        </div>

        <nav className="flex flex-1 items-center  gap-10 pl-[50px]">
          <a
            href="https://intro.zleap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-sm text-black hover:text-[#FF8A00]  hover:bg-[#FF8A001A] px-2 py-1 rounded-[6px]"
          >
            企业版
          </a>
          <Link
            href="/docs/getting-started/download"
            className="text-sm text-black hover:text-[#FF8A00]  hover:bg-[#FF8A001A] px-2 py-1 rounded-[6px]"
          >
            下载使用
          </Link>
          <Link
            href="/docs/contact/contact"
            className="text-sm text-black hover:text-[#FF8A00]  hover:bg-[#FF8A001A] px-2 py-1 rounded-[6px]"
          >
            联系我们
          </Link>
          <Link
            href="/docs/support/changelog"
            className="text-sm text-black hover:text-[#FF8A00]  hover:bg-[#FF8A001A] px-2 py-1 rounded-[6px]"
          >
            更新日志
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!hideSearch && (
            <form onSubmit={handleSearch} className="w-[360px]">
              <div className="relative" ref={searchRef}>
                <img
                  src="/images/icons/搜索图标.png"
                  alt="搜索"
                  className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 opacity-60"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => updateSearchQuery(event.target.value)}
                  onFocus={() =>
                    (searchQuery.trim() || searchHistory.length > 0) &&
                    setShowSuggestions(true)
                  }
                  placeholder="请输入关键字，如：信息管理、信息源"
                  className="h-9 w-full rounded-full border border-[#eef1f7] bg-white py-2 pl-10 pr-10 text-xs text-[#1d1f26] shadow-[0px_1.1px_13.2px_0px_rgba(28,76,186,0.08)] outline-none transition-colors placeholder:text-[#a8afbf] focus:border-[#FF8A00]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8afbf] transition-colors hover:text-[#5f6b85]"
                    aria-label="清空搜索"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-100 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
                    {suggestions.map((doc, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(doc.title)}
                        className="w-full border-b border-gray-100 px-5 py-3 text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <img src="/images/icons/搜索图标.png" alt="" className="h-4 w-4 opacity-50" />
                          <span className="text-sm text-gray-900">{doc.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {showSuggestions && !searchQuery.trim() && searchHistory.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-100 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
                    <div className="px-5 pt-4 pb-2 text-left text-xs text-gray-400">
                      搜索记录
                    </div>
                    {searchHistory.map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        onClick={() => handleSuggestionClick(keyword)}
                        className="w-full border-b border-gray-100 px-5 py-3 text-left transition-colors last:rounded-b-2xl last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <img src="/images/icons/搜索图标.png" alt="" className="h-4 w-4 opacity-50" />
                          <span className="text-sm text-gray-900">{keyword}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}

          {/* <button
            type="button"
            className="h-9 rounded-full border border-[#FFB45C] bg-white px-5 text-sm font-medium text-[#FF8A00]"
          >
            企业版
          </button> */}
          <a
            href="https://zleap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 rounded-full bg-[#FF8A00] px-5 text-sm font-medium text-white shadow-[0px_4px_12px_0px_rgba(255,138,0,0.28)] inline-flex items-center justify-center"
          >
            登录
          </a>
        </div>
      </div>
    </header>
  );
}
