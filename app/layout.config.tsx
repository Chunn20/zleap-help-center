import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import type { ReactNode } from 'react';

const Logo: ReactNode = (
  <>
    <Image
      src="/logo.png"
      alt="Zleap"
      width={24}
      height={24}
      className="rounded"
    />
    Zleap 帮助中心
  </>
);

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: Logo,
  },
  links: [
    {
      text: '产品首页',
      url: 'https://zleap.com',
      external: true,
    },
  ],
  i18n: {
    toc: '本页目录',
  } as any,
};