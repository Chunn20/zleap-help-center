'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  { label: '如何设置语言？', href: '/docs/support/language-settings' },
  { label: '如何查看通知中心？', href: '/docs/support/notification-center' },
  { label: '企业版有什么功能？', href: '/docs/about-zleap/enterprise' },
];

const features = [
  {
    title: '自动化信息收集',
    description: '7x24小时自动追踪信息源，实时更新内容',
    color: 'bg-blue-50',
  },
  {
    title: '智能分析与创作',
    description: 'AI深度理解内容，生成报告、总结和洞察',
    color: 'bg-green-50',
  },
  {
    title: '人机协作讨论',
    description: '与Agent和团队成员共同讨论，碰撞新想法',
    color: 'bg-cyan-50',
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/docs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Zleap" className="h-8 rounded" />
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
              className="rounded-full bg-white border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              登录
            </Link>
            <Link
              href="https://zleap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FF8A00] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#FF8A00]/90"
            >
              注册
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-base font-semibold text-[#FF8A00]">AI 驱动的智能内容社区</p>
          <h1 className="mb-8 text-4xl font-bold text-gray-900">
            让 AI Agent 成为你的智能信息助手
          </h1>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <img
                src="/图标/搜索图标.png"
                alt="搜索"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="请输入关键字，如：信息管理、信息源"
                className="w-full rounded-full border-2 border-[#FF8A00] bg-white pl-12 pr-6 py-4 text-base shadow-sm focus:outline-none focus:border-[#FF8A00] focus:shadow-[0_0_0_3px_rgba(255,138,0,0.1)] transition-shadow"
              />
            </div>
          </form>

          {/* Search Tags */}
          <div className="flex flex-wrap justify-center gap-3">
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
        </div>

        {/* Features Section - 在同一个背景图内 */}
        <div className="mx-auto max-w-7xl px-6 mt-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">认识Zleap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-2xl ${feature.color} p-8 text-center transition-transform hover:scale-105`}
              >
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
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
