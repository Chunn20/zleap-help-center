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
    transparentMode: 'top',
  },
  sidebar: {
    defaultOpenLevel: 1,
    collapsible: true,
  },
  enableToc: true,
};