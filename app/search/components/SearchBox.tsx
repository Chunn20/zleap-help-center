'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchBoxProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

export function SearchBox({ initialQuery = '', onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    router.push('/search');
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="h-6 w-6" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="搜索帮助文档..."
          className="w-full h-16 pl-16 pr-32 text-lg rounded-2xl border border-gray-200 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF9A1A] transition-colors font-medium"
        >
          搜索
        </button>
      </div>
    </div>
  );
}
