# Zleap 帮助中心

Zleap 官方帮助文档，基于 [Fumadocs](https://fumadocs.vercel.app/) 构建。

## 技术栈

- **框架**：Next.js 16 (App Router)
- **文档引擎**：Fumadocs v16
- **样式**：Tailwind CSS v4
- **内容格式**：MDX

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 构建部署

```bash
npm run build
npm run start
```

## 项目结构

```
content/docs/
├── about-zleap/        # 产品介绍
├── getting-started/    # 新手入门
├── information-management/  # 信息管理
├── support/            # 产品支持
└── contact/            # 联系与反馈

app/
├── page.tsx            # 首页
├── layout.tsx          # 全局布局
├── layout.config.tsx   # 导航配置
└── docs/               # 文档路由

public/images/          # 图片资源（二维码、截图等）
public/videos/          # 视频资源
```

## 添加新文档

1. 在对应的 `content/docs/` 目录下新建 `.mdx` 文件
2. 在同目录的 `meta.json` 的 `pages` 数组中添加文件名（不含扩展名）
3. 文件顶部添加 frontmatter：

```mdx
---
title: 页面标题
description: 页面描述
---
```

## 添加图片

将图片放入 `public/images/` 目录，在 MDX 中使用：

```html
<img src="/images/your-image.png" alt="描述" />
```

## 相关链接

- [Zleap 官网](https://zleap.com)
- [Zleap 企业版](https://intro.zleap.com)
- [Fumadocs 文档](https://fumadocs.vercel.app/)
