'use client';

import { usePathname } from 'fumadocs-core/framework';
import type * as PageTree from 'fumadocs-core/page-tree';
import {
  SidebarItem,
  useFolderDepth,
} from 'fumadocs-ui/components/sidebar/base';

function normalizePath(urlOrPath: string) {
  return urlOrPath.length > 1 && urlOrPath.endsWith('/') ? urlOrPath.slice(0, -1) : urlOrPath;
}

function isActiveHref(href: string, pathname: string) {
  const h = normalizePath(href);
  const p = normalizePath(pathname);
  return h === p || p.startsWith(`${h}/`);
}

function getItemOffset(depth: number) {
  const nestedIndent = depth >= 1 ? 1 : 0;
  return `calc(${5 + 4 * depth + nestedIndent} * var(--spacing))`;
}

const itemBase =
  'relative flex flex-row items-center gap-2 rounded-lg p-2 text-[#52565C] text-start text-fd-muted-foreground wrap-anywhere font-medium [&_svg]:size-4 [&_svg]:shrink-0 transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-[#FF8A001F] data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors';

const secondLevelTypography =
  "font-['OPPO_Sans_4.0'] text-[14px] font-medium leading-[22px] tracking-normal align-middle";

export function DocsSidebarLeafItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname();
  const depth = useFolderDepth();
  const active = isActiveHref(item.url, pathname);
  const isNested = depth >= 1;

  return (
    <SidebarItem
      href={item.url}
      external={item.external}
      active={active}
      icon={item.icon}
      className={`${itemBase} ${isNested ? secondLevelTypography : ''}`}
      style={{ paddingInlineStart: getItemOffset(depth) }}
    >
      {item.name}
    </SidebarItem>
  );
}