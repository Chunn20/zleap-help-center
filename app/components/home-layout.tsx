import { HomeLayout as FumadocsHomeLayout } from 'fumadocs-ui/layouts/home';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function HomeLayout({ children, ...props }: BaseLayoutProps & { children: React.ReactNode }) {
  return (
    <FumadocsHomeLayout {...props}>
      {/* Navigation Links */}
      <nav className="border-b bg-fd-background">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-6 px-6 py-3 text-sm">
          <a
            href="https://zleap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            产品首页
          </a>
          <span className="text-fd-muted-foreground/30">·</span>
          <a
            href="/docs/getting-started/download"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            下载使用
          </a>
          <span className="text-fd-muted-foreground/30">·</span>
          <a
            href="https://intro.zleap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            企业版
          </a>
          <span className="text-fd-muted-foreground/30">·</span>
          <a
            href="/docs/contact/contact"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            联系我们
          </a>
          <span className="text-fd-muted-foreground/30">·</span>
          <a
            href="/docs/support/changelog"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            更新日志
          </a>
          <span className="text-fd-muted-foreground/30">·</span>
          <a
            href="https://kcnfstknddo1.feishu.cn/share/base/form/shrcnPCPMzQMlLQbNmedv6YRZff"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#FF8A00] px-3 py-1 text-white hover:bg-[#FF8A00]/90 transition-colors font-medium"
          >
            提交反馈
          </a>
        </div>
      </nav>
      {children}
    </FumadocsHomeLayout>
  );
}
