import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Zleap',
    default: 'Zleap 帮助中心',
  },
  description: '智跃 Zleap 产品帮助文档',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          i18n={{
            locale: 'zh-CN',
            translations: {
              toc: '本页目录',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
