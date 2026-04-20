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

## 标准页面排版规范

以快速开始页面为标准，所有文档页面应遵循以下排版规范：

### 页面容器
- **最大宽度**：`780px`
- **居中对齐**：`margin: 0 auto`
- **背景色**：纯白 `#FFFFFF`

### 标题层级

#### 页面主标题（H1）
- **字号**：`32px`
- **字重**：`800`
- **颜色**：`#000000`
- **字间距**：`-0.04em`
- **行高**：`1.2`
- **下边距**：`12px`

#### 副标题/描述文字
- **字号**：`17px`
- **颜色**：`#86868b`（灰色）
- **行高**：`1.5`
- **字重**：`400`

#### 二级标题（H2）
- **字号**：`28px`
- **字重**：`700`
- **颜色**：`#1d1d1f`
- **字间距**：`-0.02em`
- **行高**：`1.3`
- **下边距**：`16px`
- **上边距**：`40px`（步骤之间）

#### 三级标题（H3）
- **字号**：`19px`
- **字重**：`600`
- **颜色**：`#1d1d1f`
- **字间距**：`-0.01em`
- **上边距**：`40px`
- **下边距**：`20px`

### 正文文字
- **字号**：`15px`
- **颜色**：`#1d1d1f`
- **行高**：`1.7`
- **段落间距**：`12px`

### 链接样式
- **颜色**：`#FF8A00`（橙色）
- **字重**：`500`
- **无下划线**，hover 时显示下划线

### 图片容器
- **最大宽度**：`780px`
- **固定高度**：`400px`
- **背景色**：`#FFF7ED`（浅橙色）
- **内边距**：`24px`
- **圆角**：`12px`
- **居中对齐**：flexbox 居中
- **图片适配**：`object-fit: contain`
- **交互**：hover 时轻微放大 `scale(1.02)`

### 图片容器
- **最大宽度**：`780px`
- **固定高度**：`400px`
- **背景色**：`#FAFAFA`（浅灰色）
- **内边距**：`24px`
- **圆角**：`12px`
- **居中对齐**：flexbox 居中
- **图片适配**：`object-fit: contain`
- **交互**：
  - hover 时轻微放大 `scale(1.01)`
  - 点击放大查看（使用 `ImageZoomOverlay` 组件）
- **使用方式**：
  ```jsx
  <div className="qs-media">
    <img src="/images/xxx.png" alt="描述" />
  </div>
  ```

### 间距规范
- **步骤之间**：`72px`
- **内容区块**：`64px`
- **段落之间**：`12px`
- **图片上下**：`24px`

## 卡片样式系统

本项目使用统一的卡片样式系统，以下是所有可用的卡片样式：

### 1. 基础卡片1
- **特点**：左对齐，图标和标题分行显示
- **背景**：白色 `#FFFFFF`
- **边框**：浅灰色 `1px solid rgba(0, 0, 0, 0.08)`
- **适用场景**：常规信息展示，如登录方式、硬件配置等
- **示例位置**：
  - `content/docs/about-zleap/about.mdx` - 适合谁使用
  - `content/docs/about-zleap/enterprise.mdx` - 企业管理的三大挑战、硬件配置
  - `content/docs/getting-started/quick-start.mdx` - 登录方式卡片

### 2. 基础卡片2
- **特点**：左对齐，图标和标题在同一行
- **背景**：白色 `#FFFFFF`
- **边框**：浅灰色 `1px solid rgba(0, 0, 0, 0.08)`
- **适用场景**：需要紧凑布局的信息展示
- **示例位置**：
  - `content/docs/about-zleap/enterprise.mdx` - 典型应用场景、企业版六大优势

### 3. 强调卡片
- **特点**：浅橙色背景，突出重要信息
- **背景**：`#FFF7ED`
- **边框**：`1px solid #FED7AA`
- **图标尺寸**：40px
- **适用场景**：需要强调的重要内容
- **示例位置**：
  - `content/docs/about-zleap/enterprise.mdx` - Zleap 如何解决

### 4. 跳转卡片
- **特点**：带箭头图标，引导用户跳转
- **背景**：白色 `#FFFFFF`
- **边框**：浅灰色
- **交互**：hover 时显示箭头动画
- **适用场景**：引导用户进入其他页面或功能

### 5. 强调+跳转卡片
- **特点**：渐变背景 + 左侧图标 + 文字 + 箭头符号
- **背景**：橙色渐变 `linear-gradient(180deg, #FF8A00 0%, #FFB84D 100%)`
- **文字颜色**：白色
- **最小宽度**：`280px`
- **内边距**：`16px 48px`
- **圆角**：`16px`
- **阴影**：`0 4px 16px rgba(255, 138, 0, 0.25)`
- **交互效果**：
  - hover 时卡片上移 2px：`transform: translateY(-2px)`
  - hover 时阴影加深：`box-shadow: 0 6px 24px rgba(255, 138, 0, 0.4)`
  - hover 时箭头向右移动 4px：`transform: translateX(4px)`
  - 过渡动画：`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`（卡片）、`transition: transform 0.2s`（箭头）
- **左侧图标**：40px 圆形白色背景，内含橙色图标
- **箭头符号**：使用文字箭头 `›`（font-size: 20px, font-weight: 700）
- **适用场景**：重要的行动号召（CTA）
- **示例位置**：
  - `content/docs/about-zleap/about.mdx` - 即刻体验
  - `content/docs/about-zleap/enterprise.mdx` - 联系我们
  - `content/docs/getting-started/download.mdx` - 立即访问

### 6. 特殊卡片
- **特点**：深色背景，高端科技感
- **背景**：深色 `#0D131A`
- **边框**：`1px solid rgba(255, 255, 255, 0.1)`
- **文字颜色**：白色 `#FFFFFF` / 半透明白色
- **阴影**：`0 4px 20px rgba(13, 19, 26, 0.3)`
- **标签颜色**：橙色 `#FF8A00`
- **适用场景**：需要特别突出的核心功能或产品介绍
- **示例位置**：
  - `content/docs/about-zleap/enterprise.mdx` - 让 AI Agent 成为企业的智能员工
  - `content/docs/getting-started/download.mdx` - 网页版卡片

### 7. 提示卡片
- **特点**：浅色背景，图标与文字顶部对齐
- **背景**：`#FFF9F0`（比强调卡片更浅）
- **边框**：`1px solid #FFE9CC`
- **内边距**：`20px 24px`
- **圆角**：`12px`
- **图标位置**：flex-start 对齐，`margin-top: 2px` 微调
- **文字颜色**：`#1d1d1f`
- **适用场景**：温馨提示、注意事项等辅助信息
- **示例位置**：
  - `content/docs/getting-started/download.mdx` - 温馨提示

### 使用建议

1. **基础卡片1/2**：用于常规信息展示，保持页面整洁
2. **强调卡片**：用于需要用户注意但不需要立即行动的内容
3. **跳转卡片**：用于引导用户浏览其他内容
4. **强调+跳转卡片**：用于重要的行动号召（CTA），必须包含箭头图标
5. **特殊卡片**：用于页面核心信息或产品亮点，谨慎使用以保持视觉层次
6. **提示卡片**：用于辅助性提示信息，不干扰主要内容
