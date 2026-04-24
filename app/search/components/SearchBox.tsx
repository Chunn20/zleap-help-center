'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HelpCenterSearchField } from '@/app/components/HelpCenterSearchField';

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
    <div className="mx-auto w-full max-w-4xl">
      <HelpCenterSearchField
        value={query}
        onChange={setQuery}
        onKeyDown={handleKeyDown}
        placeholder="请输入关键字，如：信息管理、信息源"
        rightSlot={
          <>
            {query && (
              <>
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-24 top-1/2 -translate-y-1/2 border-r border-[#dee0e3] pr-1 mr-2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-[#FF8A00] px-6 py-2 font-medium text-white transition-colors hover:bg-[#FF9A1A]"
                >
                  搜索
                </button>
              </>

            )}

          </>
        }
      />
    </div>
  );
}
