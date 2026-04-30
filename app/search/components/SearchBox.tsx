'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { HelpCenterSearchField } from '@/app/components/HelpCenterSearchField';
import { searchableDocs } from '@/app/search/search-data';

const SEARCH_HISTORY_KEY = 'zleap-help-center-search-history';
const MAX_SEARCH_HISTORY = 8;

interface SearchBoxProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

export function SearchBox({ initialQuery = '', onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<typeof searchableDocs>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const updateQuery = (value: string) => {
    setQuery(value);

    if (value.trim()) {
      const filtered = searchableDocs
        .filter(
          (doc) =>
            doc.title.toLowerCase().includes(value.toLowerCase()) ||
            doc.keywords.some((keyword) =>
              keyword.toLowerCase().includes(value.toLowerCase())
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

  const handleSearch = () => {
    if (query.trim()) {
      saveSearchHistory(query);
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(searchHistory.length > 0);
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (keyword: string) => {
    saveSearchHistory(keyword);
    setQuery(keyword);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
    onSearch(keyword);
  };

  return (
    <div
      ref={searchRef}
      className="relative z-30 mx-auto w-full max-w-4xl rounded-full shadow-[0px_0px_24px_0px_#0017341A]"
    >
      <HelpCenterSearchField
        value={query}
        onChange={updateQuery}
        onKeyDown={handleKeyDown}
        onFocus={() =>
          (query.trim() || searchHistory.length > 0) && setShowSuggestions(true)
        }
        placeholder="请输入关键字，如：信息管理、信息源"
        rightSlot={
          <>
            {query && (
              <>
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-20 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#BBBFC4] text-white transition-colors hover:bg-[#9FA5AF]"
                  aria-label="清空搜索"
                >
                  <X className="h-3 w-3 stroke-3" />
                </button>
                <span className="absolute right-18 top-1/2 h-4 w-px -translate-y-1/2 bg-[#DEE0E3]" />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-[16px] leading-none text-[#FF8A00] transition-colors hover:text-[#FF9A1A]"
                >
                  搜索
                </button>
              </>

            )}

          </>
        }
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-100 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
          {suggestions.map((doc, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(doc.title)}
              className="w-full border-b border-gray-100 px-6 py-3 text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <img src="/images/icons/搜索图标.png" alt="" className="h-4 w-4 opacity-50" />
                <span className="text-sm text-gray-900">{doc.title}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      {showSuggestions && !query.trim() && searchHistory.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-100 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="px-6 pt-4 pb-2 text-left text-xs text-gray-400">
            搜索记录
          </div>
          {searchHistory.map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => handleSuggestionClick(keyword)}
              className="w-full border-b border-gray-100 px-6 py-3 text-left transition-colors last:rounded-b-2xl last:border-b-0 hover:bg-gray-50"
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
  );
}
