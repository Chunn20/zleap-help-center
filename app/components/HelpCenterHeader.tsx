import Link from 'next/link';

export function HelpCenterHeader() {
  return (
    <header className="relative z-20 border-b bg-white">
      <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Zleap" className="h-10 rounded" />
            <span className="text-xl font-bold text-gray-900">智跃</span>
          </Link>
          <span className="text-xl text-gray-400">|</span>
          <span className="text-base text-gray-900">帮助中心</span>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="https://intro.zleap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            企业版
          </a>
          <Link
            href="/docs/getting-started/download"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            下载使用
          </Link>
          <Link
            href="/docs/contact/contact"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            联系我们
          </Link>
          <Link
            href="/docs/support/changelog"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
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
  );
}
