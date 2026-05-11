'use client';

import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex items-center justify-center gap-6">
      {/* 分页器 */}
      {totalPages > 0 && (
        <div className="flex items-center gap-2">
          {/* 上一页按钮 */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-[34px] w-[34px] items-center justify-center border border-[#E5E5E5] bg-white text-[#999] transition-colors hover:border-[#FF8A00] hover:text-[#FF8A00] disabled:cursor-not-allowed disabled:text-[#D9D9D9] disabled:hover:border-[#E5E5E5] disabled:hover:text-[#D9D9D9]"
            aria-label="上一页"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* 页码 */}
          <div className="flex items-center gap-2">
            {pageNumbers.map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-[34px] w-[34px] items-center justify-center text-[#999]"
                  >
                    ...
                  </span>
                );
              }

              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`flex h-[34px] min-w-[34px] items-center justify-center px-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-2 border-[#FF8A00] bg-white text-[#FF8A00]'
                      : 'border border-[#E5E5E5] bg-white text-[#333] hover:border-[#FF8A00] hover:text-[#FF8A00]'
                  }`}
                  aria-label={`第 ${page} 页`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* 下一页按钮 */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-[34px] w-[34px] items-center justify-center border border-[#E5E5E5] bg-white text-[#999] transition-colors hover:border-[#FF8A00] hover:text-[#FF8A00] disabled:cursor-not-allowed disabled:text-[#D9D9D9] disabled:hover:border-[#E5E5E5] disabled:hover:text-[#D9D9D9]"
            aria-label="下一页"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 每页条数选择器 */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex h-[34px] min-w-[100px] items-center justify-between gap-2 border border-[#E5E5E5] bg-white px-3 text-sm text-[#333] transition-colors hover:border-[#FF8A00]"
        >
          <span>{pageSize} 条/页</span>
          <ChevronDown className={`h-4 w-4 text-[#999] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute bottom-full left-0 z-10 mb-1 w-full overflow-hidden border border-[#E5E5E5] bg-white shadow-md">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                onClick={() => {
                  onPageSizeChange(size);
                  setIsDropdownOpen(false);
                }}
                className={`flex w-full items-center justify-center px-3 py-2 text-sm transition-colors hover:bg-[#FFF7ED] ${
                  size === pageSize ? 'bg-[#FFF7ED] text-[#FF8A00]' : 'text-[#333]'
                }`}
              >
                {size} 条/页
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
