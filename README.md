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

所有文档页面应遵循以下排版规范：

### 页面容器
- **最大宽度**：`780px`
- **居中对齐**：`margin: 0 auto`
- **背景色**：纯白 `#FFFFFF`
- **无缩进**：内容与页面标题左对齐

### 标题层级

#### 页面主标题（H1）
- **字号**：`32px`
- **字重**：`800`
- **颜色**：`#1d1d1f`
- **下边距**：`0px`（与描述文字紧贴）
- **配置位置**：`app/global.css` 第 140-144 行

#### 页面描述文字（H1 下方的描述）
- **字号**：继承默认
- **上边距**：`0px`（与 H1 紧贴）
- **下边距**：`20px`（与下方内容的间距）
- **与第一个 H2 的距离**：`0px`（描述文字与紧跟其后的第一个 H2 标题紧贴，无间距）
- **配置位置**：`app/global.css` 第 128-138 行（面包屑）、内联 CSS 控制

#### 二级标题（H2）
- **字号**：`24px`
- **字重**：`700`
- **颜色**：`#1d1d1f`
- **字间距**：`-0.02em`
- **行高**：`1.3`
- **上边距**：`60px`（默认）
- **下边距**：`24px`
- **特殊情况**：紧跟描述文字的第一个 H2 上边距为 `0px`
- **CSS 配置**：
  ```css
  /* 默认 H2 样式 */
  #nd-page h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1d1d1f;
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin-top: 60px;
    margin-bottom: 24px;
  }
  
  /* 第一个 H2（紧跟描述文字） */
  #nd-page > p + h2 {
    margin-top: 0px;
  }
  ```

#### 三级标题（H3）
- **字号**：`19px`
- **字重**：`600`
- **颜色**：`#1d1d1f`
- **字间距**：`-0.01em`
- **上边距**：`40px`
- **下边距**：`20px`

### 正文文字
- **字号**：`17px`（统一标准）
- **颜色**：`#1d1d1f`
- **行高**：`1.7`
- **段落间距**：`12px`
- **完整样式**：
  ```jsx
  <p style={{ fontSize: '17px', color: '#1d1d1f', lineHeight: 1.7, margin: '12px 0' }}>
    正文内容
  </p>
  ```

### 链接样式
- **颜色**：`#FF8A00`（橙色）
- **字重**：`500`
- **无下划线**，hover 时显示下划线
- **完整样式**：
  ```jsx
  <a href="/path" style={{ color: '#FF8A00', textDecoration: 'none', fontWeight: 500 }}>链接文字</a>
  ```

### 图片容器
- **最大宽度**：`100%`（撑满页面宽度）
- **固定高度**：`400px`
- **背景色**：`#FAFAFA`（浅灰色）
- **内边距**：`24px`
- **圆角**：`12px`
- **边框**：`1px solid rgba(0, 0, 0, 0.04)`
- **居中对齐**：flexbox 居中（`display: flex, alignItems: center, justifyContent: center`）
- **图片适配**：`object-fit: contain`
- **交互**：
  - `cursor: pointer`（可点击）
  - hover 时轻微放大 `transform: scale(1.01)`（通过 `transition: transform 0.2s` 实现）
  - **左键单击放大查看**（使用 `ImageZoomOverlay` 组件，需在页面底部添加 `<ImageZoomOverlay />`）
- **完整样式**：
  ```jsx
  <div style={{ margin: '24px auto', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.04)', maxWidth: '100%', width: '100%', height: '400px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', cursor: 'pointer', transition: 'transform 0.2s' }}>
    <img src="/path/to/image.png" alt="描述" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'block', objectFit: 'contain' }} />
  </div>
  ```
- **注意事项**：
  - 页面底部必须添加 `<ImageZoomOverlay />` 组件才能实现点击放大功能
  - 图片容器会自动适应页面宽度，无需设置固定的 `maxWidth: '780px'`

### 间距规范
- **H1 与描述文字**：`0px`（紧贴）
- **描述文字与 H2**：`0px`（紧贴）
- **H2 与内容**：`16px` - `24px`
- **重要按钮上下留白**：`90px`（如"即刻体验"按钮）
- **卡片之间**：`16px`
- **段落之间**：`12px`

## 卡片样式系统

本项目使用统一的卡片样式系统，以下是所有可用的卡片样式：

### 1. 基础卡片1
- **特点**：左对齐，图标和标题分行显示
- **背景**：白色 `#FFFFFF`
- **边框**：`1px solid rgba(0, 0, 0, 0.04)`
- **圆角**：`16px`
- **内边距**：`24px`
- **图标尺寸**：`40px × 40px`
- **图标背景**：`rgba(255, 138, 0, 0.1)`
- **标题字号**：`17px`，字重 `600`
- **描述字号**：`17px`，颜色 `#86868b`
- **适用场景**：常规信息展示
- **完整样式**：
  ```jsx
  <div style={{ border: '1px solid rgba(0, 0, 0, 0.04)', borderRadius: '16px', padding: '24px', background: '#FFFFFF' }}>
    <div style={{ width: '40px', height: '40px', background: 'rgba(255, 138, 0, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', color: '#FF8A00' }}>
      <IconComponent className="h-6 w-6" />
    </div>
    <p style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 8px 0' }}>标题</p>
    <p style={{ fontSize: '17px', color: '#86868b', lineHeight: 1.7, margin: 0 }}>描述文字</p>
  </div>
  ```
- **示例位置**：
  - `content/docs/about-zleap/about.mdx` - 三大核心能力
  - `content/docs/about-zleap/enterprise.mdx` - 企业管理的三大挑战、硬件配置

### 2. 基础卡片2
- **特点**：左对齐，图标和标题在同一行
- **背景**：白色 `#FFFFFF`
- **边框**：`1px solid rgba(0, 0, 0, 0.04)`
- **圆角**：`16px`
- **内边距**：`24px`
- **图标尺寸**：`40px × 40px`
- **标题字号**：`17px`，字重 `600`
- **描述字号**：`17px`，颜色 `#86868b`
- **适用场景**：需要紧凑布局的信息展示
- **完整样式**：
  ```jsx
  <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.04)', borderRadius: '16px', padding: '24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <div style={{ width: '40px', height: '40px', background: 'rgba(255, 138, 0, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF8A00', flexShrink: 0 }}>
        <IconComponent className="h-5 w-5" />
      </div>
      <p style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', margin: 0 }}>标题</p>
    </div>
    <p style={{ fontSize: '17px', color: '#86868b', margin: 0, lineHeight: 1.7 }}>描述文字</p>
  </div>
  ```
- **示例位置**：
  - `content/docs/about-zleap/about.mdx` - 适合谁使用
  - `content/docs/about-zleap/enterprise.mdx` - 典型应用场景、企业版六大优势

### 3. 强调卡片
- **特点**：浅橙色背景，突出重要信息
- **背景**：`#FFF7ED`
- **边框**：`1px solid #FED7AA`
- **圆角**：`14px`
- **内边距**：`20px`
- **图标背景**：`#FFE9B9`
- **图标尺寸**：`40px × 40px`
- **标题字号**：`17px`，字重 `600`
- **描述字号**：`17px`，颜色 `#86868b`
- **适用场景**：需要强调的重要内容
- **完整样式**：
  ```jsx
  <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '14px', padding: '20px' }}>
    <div style={{ width: '40px', height: '40px', background: '#FFE9B9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', color: '#FF8A00' }}>
      <IconComponent className="h-5 w-5" />
    </div>
    <p style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 8px 0' }}>标题</p>
    <p style={{ fontSize: '17px', color: '#86868b', lineHeight: 1.7, margin: 0 }}>描述文字</p>
  </div>
  ```
- **示例位置**：
  - `content/docs/about-zleap/enterprise.mdx` - Zleap 如何解决

### 4. 跳转卡片
- **特点**：左侧图标 + 标题 + 描述，hover 时边框发光
- **背景**：白色 `#FFFFFF`
- **边框**：`1px solid rgba(0, 0, 0, 0.08)`
- **圆角**：`16px`
- **内边距**：`24px`
- **图标尺寸**：`40px × 40px`
- **图标背景**：`rgba(255, 138, 0, 0.1)`
- **标题字号**：`17px`，字重 `600`
- **描述字号**：`17px`，颜色 `#86868b`
- **hover 效果**：
  - 边框发光：`box-shadow: 0 0 0 2px rgba(255, 138, 0, 0.5)`
  - 轻微上移：`transform: translateY(-2px)`
- **适用场景**：引导用户进入其他页面或功能
- **完整样式**：
  ```jsx
  <a href="/target-url" style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '16px', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', cursor: 'pointer' }}>
    <div style={{ width: '40px', height: '40px', background: 'rgba(255, 138, 0, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', color: '#FF8A00' }}>
      <IconComponent className="h-5 w-5" />
    </div>
    <p style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 8px 0' }}>标题</p>
    <p style={{ fontSize: '17px', color: '#86868b', lineHeight: 1.7, margin: 0 }}>描述文字</p>
  </a>
  ```
- **CSS hover 效果**（需在页面 `<style>` 标签中添加）：
  ```css
  /* 跳转卡片 hover 效果 */
  a[href^="/docs/"]:hover {
    box-shadow: 0 0 0 2px rgba(255, 138, 0, 0.5) !important;
    transform: translateY(-2px) !important;
  }
  ```
- **示例位置**：
  - `content/docs/getting-started/quick-start.mdx` - 下一步

### 5. 强调+跳转卡片
- **特点**：渐变背景 + 左侧圆形图标 + 文字 + 箭头符号
- **背景**：橙色渐变 `linear-gradient(180deg, #FF8A00 0%, #FFB84D 100%)`
- **文字颜色**：白色 `#FFFFFF`
- **最小宽度**：`280px`
- **内边距**：`16px 48px`
- **圆角**：`16px`
- **阴影**：`0 4px 16px rgba(255, 138, 0, 0.25)`
- **图标容器**：`40px × 40px` 白色圆形，橙色图标
- **标题字号**：`17px`，字重 `700`
- **箭头符号**：`›`，字号 `20px`，字重 `700`
- **hover 效果**：
  - 阴影增强：`0 6px 24px rgba(255, 138, 0, 0.4)`
  - 向上移动：`translateY(-2px)`
  - 背景渐变加亮
  - 箭头向右移动：`translateX(4px)`
- **适用场景**：重要的行动号召（CTA）
- **完整样式**：
  ```jsx
  <div style={{ margin: '90px 0', display: 'flex', justifyContent: 'center' }}>
    <a
      href="/target-url"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(180deg, #FF8A00 0%, #FFB84D 100%)', padding: '16px 48px', borderRadius: '16px', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 16px rgba(255, 138, 0, 0.25)', cursor: 'pointer', minWidth: '280px', justifyContent: 'center' }}
    >
      <div style={{ width: '40px', height: '40px', background: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF8A00', flexShrink: 0 }}>
        <IconComponent className="h-5 w-5" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <p style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>按钮文字</p>
        <span style={{ color: '#FFFFFF', fontSize: '20px', lineHeight: 1, fontWeight: 700 }}>›</span>
      </div>
    </a>
  </div>
  ```
- **示例位置**：
  - `content/docs/about-zleap/about.mdx` - 即刻体验
  - `content/docs/about-zleap/enterprise.mdx` - 联系我们

### 6. 特殊卡片
- **特点**：深色背景，高端科技感
- **背景**：`#898989`（深灰色）
- **边框**：`1px solid rgba(255, 255, 255, 0.1)`
- **圆角**：`16px`
- **内边距**：`32px`
- **文字颜色**：白色 `#FFFFFF`
- **阴影**：`0 4px 20px rgba(0, 0, 0, 0.15)`
- **标签背景**：橙色 `#FF8A00`
- **标题字号**：`22px`，字重 `700`
- **正文字号**：`14px`
- **适用场景**：需要特别突出的核心功能或产品介绍
- **完整样式**：
  ```jsx
  <div style={{ background: '#898989', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '32px', margin: '0 0 32px 0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <span style={{ background: '#FF8A00', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.05em' }}>标签</span>
      <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)' }}>副标题</span>
    </div>
    <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.4 }}>主标题</h2>
    <p style={{ fontSize: '14px', color: '#FFFFFF', lineHeight: 1.8, margin: '12px 0' }}>
      正文内容
    </p>
  </div>
  ```
- **示例位置**：
  - `content/docs/about-zleap/enterprise.mdx` - 让 AI Agent 成为企业的智能员工

### 7. 提示卡片
- **特点**：浅色背景，图标与标题文字在同一行对齐
- **背景**：`#FFF9F0`（比强调卡片更浅）
- **边框**：`1px solid #FFE9CC`
- **内边距**：`20px 24px`
- **圆角**：`12px`
- **图标位置**：与第一行文字在同一行，使用 `display: flex, alignItems: center`
- **文字颜色**：`#1d1d1f`
- **文字字号**：`14px`
- **适用场景**：温馨提示、注意事项等辅助信息
- **完整样式**：
  ```jsx
  {/* 单行提示 */}
  <div style={{ background: '#FFF9F0', border: '1px solid #FFE9CC', borderRadius: '12px', padding: '20px 24px', margin: '32px 0' }}>
    <p style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: 1.7, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
      <IconComponent className="h-5 w-5" style={{ color: '#FF8A00', flexShrink: 0 }} />
      <strong>提示：</strong>提示内容文字
    </p>
  </div>

  {/* 多行提示（带列表） */}
  <div style={{ background: '#FFF9F0', border: '1px solid #FFE9CC', borderRadius: '12px', padding: '20px 24px', margin: '32px 0' }}>
    <p style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: 1.7, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <IconComponent className="h-5 w-5" style={{ color: '#FF8A00', flexShrink: 0 }} />
      <strong>提示：</strong>
    </p>
    <ul style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: 1.7, margin: 0, paddingLeft: '32px' }}>
      <li>列表项 1</li>
      <li>列表项 2</li>
    </ul>
  </div>
  ```

### 使用建议

1. **基础卡片1/2**：用于常规信息展示，保持页面整洁
2. **强调卡片**：用于需要用户注意但不需要立即行动的内容
3. **跳转卡片**：用于引导用户浏览其他内容
4. **强调+跳转卡片**：用于重要的行动号召（CTA），必须包含圆形图标和箭头符号
5. **特殊卡片**：用于页面核心信息或产品亮点，谨慎使用以保持视觉层次
6. **提示卡片**：用于辅助性提示信息，不干扰主要内容

### 卡片文字统一规范
- **所有卡片标题**：`17px`，字重 `600`
- **所有卡片描述**：`17px`，颜色 `#86868b`
- **提示卡片文字**：`14px`，颜色 `#1d1d1f`
- **行高**：`1.7`

## 表格样式

### 标准表格
- **边框**：`1px solid rgba(0, 0, 0, 0.08)`
- **表头背景**：`#FAFAFA`
- **表头字重**：`600`
- **表头字号**：`14px`
- **表头颜色**：`#1d1d1f`
- **单元格内边距**：`12px 16px`
- **单元格字号**：`14px`
- **单元格颜色**：`#1d1d1f`
- **行高**：`1.7`
- **完整样式**：
  ```jsx
  <table style={{ width: '100%', borderCollapse: 'collapse', margin: '24px 0' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '12px 16px', background: '#FAFAFA', fontWeight: 600, fontSize: '14px', color: '#1d1d1f', textAlign: 'left' }}>表头1</th>
        <th style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '12px 16px', background: '#FAFAFA', fontWeight: 600, fontSize: '14px', color: '#1d1d1f', textAlign: 'left' }}>表头2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '12px 16px', fontSize: '14px', color: '#1d1d1f', lineHeight: 1.7 }}>内容1</td>
        <td style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '12px 16px', fontSize: '14px', color: '#1d1d1f', lineHeight: 1.7 }}>内容2</td>
      </tr>
    </tbody>
  </table>
  ```
- **示例位置**：
  - `content/docs/information-management/create-private/api.mdx` - 请求方式说明表格

## 代码块样式

### 标准代码块
- **背景色**：`#F5F5F5`（浅灰色）
- **边框**：`1px solid rgba(0, 0, 0, 0.08)`
- **圆角**：`12px`
- **内边距**：`20px`
- **字体**：`'Consolas', 'Monaco', 'Courier New', monospace`
- **字号**：`14px`
- **行高**：`1.6`
- **颜色**：`#1d1d1f`
- **上下边距**：`24px 0`
- **横向滚动**：`overflowX: 'auto'`
- **完整样式**：
  ```jsx
  <div style={{ background: '#F5F5F5', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '20px', margin: '24px 0', overflowX: 'auto' }}>
    <pre style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#1d1d1f' }}><code style={{ fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace" }}>{`代码内容`}</code></pre>
  </div>
  ```
- **示例位置**：
  - `content/docs/information-management/create-private/wecom-bot.mdx` - 企微 API 命令代码块
