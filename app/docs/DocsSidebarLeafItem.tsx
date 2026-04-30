'use client';

import { usePathname } from 'fumadocs-core/framework';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
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
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

const itemBase =
  'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere font-medium [&_svg]:size-4 [&_svg]:shrink-0 transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors';

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

function hasActiveInFolder(folder: PageTree.Folder, pathname: string): boolean {
  if (folder.index && isActiveHref(folder.index.url, pathname)) return true;

  return folder.children.some((node) => {
    if (node.type === 'page') return isActiveHref(node.url, pathname);
    if (node.type === 'folder') return hasActiveInFolder(node, pathname);
    return false;
  });
}

export function DocsSidebarFolder({
  item,
  children,
}: {
  item: PageTree.Folder;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const depth = useFolderDepth();
  const isNested = depth >= 1;
  const folderTitleClass = `${isNested ? secondLevelTypography : ''} font-medium`;

  return (
    <SidebarFolder
      collapsible={item.collapsible}
      defaultOpen={item.defaultOpen}
      active={hasActiveInFolder(item, pathname)}
    >
      {item.index ? (
        <SidebarFolderLink
          href={item.index.url}
          active={isActiveHref(item.index.url, pathname)}
          external={item.index.external}
          className={folderTitleClass}
        >
          {item.icon}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger className={folderTitleClass}>
          {item.icon}
          {item.name}
        </SidebarFolderTrigger>
      )}
      <SidebarFolderContent>{children}</SidebarFolderContent>
    </SidebarFolder>
  );
}
