import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import type { ReactNode } from 'react';

const Logo: ReactNode = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    {/* <Image
      src="/logo.png"
      alt="Zleap"
      width={32}
      height={32}
      className="rounded"
    />
    <span style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f' }}>智跃</span>
    <span className='border-l border-solid border-gray-400 pl-3' style={{ fontSize: '16px', fontWeight: 400, color: '#1d1d1f' }}>帮助中心</span> */}
  </div>
);

export const baseOptions: BaseLayoutProps = {
  nav: {
    enabled: false,
  },
  themeSwitch: {
    enabled: false,
  },

};