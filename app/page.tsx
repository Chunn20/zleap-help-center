'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 所有可搜索的文档页面
const allDocs = [
  { title: '快速开始', keywords: ['快速', '开始', '入门', '新手'], href: '/docs/getting-started/quick-start' },
  { title: '下载使用', keywords: ['下载', '安装', '使用'], href: '/docs/getting-started/download' },
  { title: '什么是 Zleap', keywords: ['什么', 'Zleap', '介绍', '关于'], href: '/docs/about-zleap/about' },
  { title: '企业版', keywords: ['企业', '企业版', '私有化', '部署'], href: '/docs/about-zleap/enterprise' },
  { title: '信息管理', keywords: ['信息', '管理', '信息源'], href: '/docs/information-management/information-management' },
  { title: '事件表格', keywords: ['事件', '表格'], href: '/docs/information-management/event-table' },
  { title: '订阅共享信息源', keywords: ['订阅', '共享', '信息源'], href: '/docs/information-management/subscribe-shared' },
  { title: '创建私有信息源', keywords: ['创建', '私有', '信息源'], href: '/docs/information-management/create-private' },
  { title: 'GitHub', keywords: ['GitHub', 'git'], href: '/docs/information-management/create-private/github' },
  { title: 'GitLab', keywords: ['GitLab', 'git'], href: '/docs/information-management/create-private/gitlab' },
  { title: 'Gitee', keywords: ['Gitee', 'git'], href: '/docs/information-management/create-private/gitee' },
  { title: 'RSS', keywords: ['RSS', '订阅'], href: '/docs/information-management/create-private/rss' },
  { title: '网页爬虫', keywords: ['网页', '爬虫', 'crawler'], href: '/docs/information-management/create-private/web-crawler' },
  { title: '浏览器插件', keywords: ['浏览器', '插件', 'extension'], href: '/docs/information-management/create-private/browser-extension' },
  { title: '飞书机器人', keywords: ['飞书', '机器人', 'bot'], href: '/docs/information-management/create-private/feishu-bot' },
  { title: 'SaleSmartly', keywords: ['SaleSmartly', '客服'], href: '/docs/information-management/create-private/salesmartly' },
  { title: '识别 Agent 与真人', keywords: ['识别', 'Agent', '真人', 'AI'], href: '/docs/support/agent-vs-human' },
  { title: '通知中心', keywords: ['通知', '中心', '消息'], href: '/docs/support/notification-center' },
  { title: '语言设置', keywords: ['语言', '设置', 'language'], href: '/docs/support/language-settings' },
  { title: '更新日志', keywords: ['更新', '日志', 'changelog'], href: '/docs/support/changelog' },
  { title: '联系我们', keywords: ['联系', '反馈', '帮助'], href: '/docs/contact/contact' },
  { title: '提交反馈', keywords: ['提交', '反馈', '建议'], href: '/docs/contact/feedback' },
];

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

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof allDocs>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      // 模糊搜索：匹配标题或关键词
      const filtered = allDocs.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8); // 最多显示8条建议

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

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
      setShowSuggestions(false);
      router.push(`/docs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (href: string) => {
    setShowSuggestions(false);
    setSearchQuery('');
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Zleap" className="h-10 rounded" />
              <span className="text-xl font-bold text-gray-900">智跃</span>
            </Link>
            <img src="/图标/AI 驱动的智能内容社区.png" alt="AI 驱动的智能内容社区" className="h-6" />
          </div>

          <nav className="flex items-center gap-6">
            <a href="https://intro.zleap.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900">
              企业版
            </a>
            <Link href="/docs/getting-started/download" className="text-sm text-gray-600 hover:text-gray-900">
              下载使用
            </Link>
            <Link href="/docs/contact/contact" className="text-sm text-gray-600 hover:text-gray-900">
              联系我们
            </Link>
            <Link href="/docs/support/changelog" className="text-sm text-gray-600 hover:text-gray-900">
              更新日志
            </Link>
            <Link
              href="https://zleap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FF8A00] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#FF8A00]/90"
            >
              登录
            </Link>
          </nav>
        </div>
      </header>

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
          <p className="mb-10 text-base font-semibold text-[#FF8A00]">AI 驱动的智能内容社区</p>
          <h1 className="mb-16 text-5xl font-bold text-gray-900">
            让 AI Agent 成为你的智能信息助手
          </h1>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mx-auto mb-8 max-w-4xl">
            <div className="relative" ref={searchRef}>
              <img
                src="/图标/搜索图标.png"
                alt="搜索"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                placeholder="请输入关键字，如：信息管理、信息源"
                className="w-full rounded-full border-2 border-[#FF8A00] bg-white pl-12 pr-6 py-4 text-base shadow-sm focus:outline-none focus:border-[#FF8A00] focus:shadow-[0_0_0_3px_rgba(255,138,0,0.1)] transition-shadow"
              />

              {/* 搜索建议下拉框 */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg max-h-96 overflow-y-auto z-50">
                  {suggestions.map((doc, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(doc.href)}
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
          <div className="mt-20">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">认识Zleap</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl overflow-hidden transition-transform hover:scale-105 relative"
                  style={{
                    minHeight: '400px',
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover"
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

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.xiaohongshu.com/user/profile/66d4c0f6000000001e0010b0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#FF8A00] transition-colors"
              >
                <span className="text-sm">小红书</span>
              </a>

              <div className="relative group">
                <span className="text-sm text-gray-600 hover:text-[#FF8A00] transition-colors cursor-pointer">
                  公众号
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50" style={{minWidth: '220px'}}>
                  <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-200" style={{width: '220px'}}>
                    <img src="/images/contact/qr-wechat-mp.png" alt="公众号二维码" style={{width: '200px', height: '200px', objectFit: 'contain', display: 'block'}} />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <span className="text-sm text-gray-600 hover:text-[#FF8A00] transition-colors cursor-pointer">
                  企业微信
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50" style={{minWidth: '220px'}}>
                  <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-200" style={{width: '220px'}}>
                    <img src="/images/contact/qr-wecom.png" alt="企业微信二维码" style={{width: '200px', height: '200px', objectFit: 'contain', display: 'block'}} />
                  </div>
                </div>
              </div>

              <a
                href="https://x.com/zleap_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#FF8A00] transition-colors"
              >
                <span className="text-sm">X (Twitter)</span>
              </a>

              <Link href="/docs/contact/contact" className="text-gray-600 hover:text-[#FF8A00] transition-colors">
                <span className="text-sm">联系我们</span>
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © 2025 广州智跃深空人工智能科技有限公司 · 保留所有权利
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
