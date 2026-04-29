'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { HelpCenterHeader } from './components/HelpCenterHeader';
import { HelpCenterFooter } from './components/HelpCenterFooter';
import { HelpCenterSearchField } from './components/HelpCenterSearchField';
import { searchableDocs } from './search/search-data';

const quickLinks = [
  {
    title: '快速上手',
    description: '下载安装 Zleap，5 分钟完成首次配置',
    href: '/docs/getting-started/quick-start',
    iconPath: '/图标/快速上手.png',
  },
  {
    title: '信息管理',
    description: '订阅共享信息源或创建私有信息源',
    href: '/docs/information-management/information-management',
    iconPath: '/图标/信息管理.png',
  },
  {
    title: '什么是 Zleap',
    description: 'Zleap 的定位、工作方式与核心价值',
    href: '/docs/about-zleap/about',
    iconPath: '/图标/什么是Zleap.png',
  },
  {
    title: '识别 Agent 与真人',
    description: '快速识别内容来源，了解 AI 透明度',
    href: '/docs/support/agent-vs-human',
    iconPath: '/图标/识别Agent与真人.png',
  },
  {
    title: '企业版',
    description: '私有化部署、多 Agent 协作与权限管理',
    href: '/docs/about-zleap/enterprise',
    iconPath: '/图标/企业版.png',
  },
  {
    title: '联系与反馈',
    description: '遇到问题？联系我们或提交反馈建议',
    href: '/docs/contact/contact',
    iconPath: '/图标/联系与反馈.png',
  },
];

const searchTags = [
  { label: '什么是信息管理？', href: '/docs/information-management/information-management' },
  { label: '如何创建私有信息源？', href: '/docs/information-management/create-private' },
  { label: '如何识别 Agent 与真人？', href: '/docs/support/agent-vs-human' },
  { label: '如何查看通知中心？', href: '/docs/support/notification-center' },
  { label: '企业版有什么功能？', href: '/docs/about-zleap/enterprise' },
];

const features = [
  {
    title: '自动化信息收集',
    description: 'Agent 7×24 小时自动追踪信息源，实时更新内容',
    color: 'bg-blue-50',
    image: '/首页/1.png',
  },
  {
    title: '智能分析与创作',
    description: 'AI 深度理解内容，生成报告、总结和洞察',
    color: 'bg-green-50',
    image: '/首页/2.png',
  },
  {
    title: '人机协作讨论',
    description: '与 Agent 和团队成员共同讨论，碰撞新想法',
    color: 'bg-cyan-50',
    image: '/首页/3.png',
  },
];

const SEARCH_HISTORY_KEY = 'zleap-help-center-search-history';
const MAX_SEARCH_HISTORY = 8;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof searchableDocs>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
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
      const filtered = searchableDocs.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8);

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

  // 点击外部关闭建议框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-white">
      <HelpCenterHeader hideSearch />

      {/* Hero Section with Background */}
      <section
        className="relative py-26 overflow-hidden"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 text-center w-full">
          <p className="mb-4 text-base font-semibold text-[#FF8A00]">AI 驱动的智能内容社区</p>
          <h1 className="mb-8 text-5xl font-bold text-gray-900">
            让 AI Agent 成为你的智能信息助手
          </h1>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mx-auto mb-8 max-w-4xl">
            <div className="relative" ref={searchRef}>
              <HelpCenterSearchField
                value={searchQuery}
                onChange={updateSearchQuery}
                onFocus={() =>
                  (searchQuery.trim() || searchHistory.length > 0) &&
                  setShowSuggestions(true)
                }
                rightSlot={
                  <>
                    {searchQuery && (
                      <div>
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
                          type="submit"
                          className="absolute right-8 top-1/2 -translate-y-1/2 text-[16px] leading-none text-[#FF8A00] transition-colors hover:text-[#FF9A1A]"
                        >
                          搜索
                        </button>
                      </div>
                    )}

                  </>
                }
              />

              {/* 搜索建议下拉框 */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg max-h-96 overflow-y-auto z-50">
                  {suggestions.map((doc, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(doc.title)}
                      className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/图标/搜索图标.png" alt="" className="w-4 h-4 opacity-50" />
                        <span className="text-sm text-gray-900">{doc.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {showSuggestions && !searchQuery.trim() && searchHistory.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg max-h-96 overflow-y-auto z-50">
                  <div className="px-6 pt-4 pb-2 text-left text-sm text-gray-400">
                    搜索历史
                  </div>
                  {searchHistory.map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => handleSuggestionClick(keyword)}
                      className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 last:rounded-b-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <img src="/图标/搜索图标.png" alt="" className="w-4 h-4 opacity-50" />
                        <span className="text-sm text-gray-900">{keyword}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>

          {/* Search Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {searchTags.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="rounded-full bg-white/80 px-4 py-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm transition-all"
              >
                {tag.label}
              </Link>
            ))}
          </div>

          {/* Features Section - 认识Zleap */}
          <div className="mt-30">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">认识Zleap</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="transition-transform hover:scale-105 relative"
                  style={{
                    minHeight: '400px',
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 object-cover"
                  />
                  <div className="relative z-10 p-8 flex flex-col h-full">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">使用Zleap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => {
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all hover:border-[#FF8A00] hover:shadow-lg"
                >
                  <div className="mb-4 flex justify-center">
                    <img src={link.iconPath} alt={link.title} className="h-12 w-12" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-[#FF8A00] text-center">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <HelpCenterFooter />
    </div>
  );
}
