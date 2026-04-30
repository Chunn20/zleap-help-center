import './docs-sidebar.css';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { CSSProperties, ReactNode } from 'react';
import { source } from '@/lib/source';
import { baseOptions } from '@/app/layout.config';
import { HelpCenterHeader } from '@/app/components/HelpCenterHeader';
import { DocsSidebarLeafItem } from '@/app/docs/DocsSidebarLeafItem';

const docsLayoutStyle = {
  '--fd-banner-height': '64px',
} as CSSProperties;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HelpCenterHeader />
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions}
        sidebar={{
          collapsible: false,
          className: 'bg-white',
          components: {
            Item: DocsSidebarLeafItem,
          },
        }}
        containerProps={{ style: docsLayoutStyle }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
