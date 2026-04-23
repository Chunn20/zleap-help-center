import Link from 'next/link';

export function HelpCenterFooter() {
  return (
    <footer className="border-t bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://xhslink.com/m/36WYk6w3Oqi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-[#FF8A00]"
            >
              <span className="text-sm">小红书</span>
            </a>

            <div className="group relative">
              <span className="cursor-pointer text-sm text-gray-600 transition-colors hover:text-[#FF8A00]">
                公众号
              </span>
              <div
                className="absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 group-hover:block"
                style={{ minWidth: '220px' }}
              >
                <div
                  className="rounded-lg border border-gray-200 bg-white p-3 shadow-xl"
                  style={{ width: '220px' }}
                >
                  <img
                    src="/images/contact/qr-wechat-mp.png"
                    alt="公众号二维码"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="group relative">
              <span className="cursor-pointer text-sm text-gray-600 transition-colors hover:text-[#FF8A00]">
                企业微信
              </span>
              <div
                className="absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 group-hover:block"
                style={{ minWidth: '220px' }}
              >
                <div
                  className="rounded-lg border border-gray-200 bg-white p-3 shadow-xl"
                  style={{ width: '220px' }}
                >
                  <img
                    src="/images/contact/qr-wecom.png"
                    alt="企业微信二维码"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>

            <a
              href="https://x.com/zleapai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-[#FF8A00]"
            >
              <span className="text-sm">X (Twitter)</span>
            </a>

            <Link
              href="/docs/contact/contact"
              className="text-gray-600 transition-colors hover:text-[#FF8A00]"
            >
              <span className="text-sm">联系我们</span>
            </Link>
          </div>

          <p className="text-sm text-gray-600">
            © 2025 广州智跃深空人工智能科技有限公司 · 保留所有权利
          </p>
        </div>
      </div>
    </footer>
  );
}
