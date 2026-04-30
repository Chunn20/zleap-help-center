# HTML 设计规范

## 色彩系统 Color System

### 主题色 Brand Color

#### 主色 Primary
```css
--color-primary: #FF8800;
--color-primary-hover: #FF9933;
--color-primary-active: #E67700;
--color-primary-light: #FFF5E6; 
--color-primary-light-hover: #FFE8CC;
--color-primary-light-active: #FFD699;
```

**使用场景：** 主要按钮、重点文案、重点卡片

#### 深色 Dark
```css
--color-primary-dark: #1A1D23;
--color-primary-dark-hover: #2D3139;
--color-primary-dark-active: #14161A;
--color-primary-light-dark: #F5F6F7;
--color-primary-light-dark-hover: #E8EAED;
--color-primary-light-dark-active: #D1D5DB;
```

**使用场景：** 标题文字、辅助文案

#### 浅色 Light
```css
--color-primary-light-bg: #FFFFFF;
--color-primary-light-bg-hover: #F9FAFB;
--color-primary-light-bg-active: #F3F4F6;
```

**使用场景：** 非重要的卡片框

---

## 标题 Typography - Headings

### 标题层级说明
在 MDX 文件中：
- **H1（#）** 对应页面主标题（如"智跃 Zleap 企业版"），由 frontmatter 的 title 字段生成
- **H2（##）** 对应一级模块标题（如"企业管理的三大挑战"）
- **H3（###）** 对应二级小节标题（如"管理层决策支持"）

### header-1 (H1)
- **Font Family:** Arial, "Microsoft YaHei", sans-serif
- **Font Size:** 36px
- **Font Weight:** 600 (SemiBold)
- **Line Height:** 1.4
- **使用场景：** 页面主标题（由 frontmatter title 生成）

**示例：** 智跃 Zleap 企业版

**CSS 实现：**
```css
#nd-page > h1 {
  font-size: 36px !important;
  margin-bottom: 0px !important;
}
```

---

### header-2 (H2 / ##)
- **Font Family:** Arial, "Microsoft YaHei", sans-serif
- **Font Size:** 26px
- **Font Weight:** 600 (SemiBold)
- **Line Height:** 1.4
- **使用场景：** 一级模块标题

**示例：** 企业管理的三大挑战

**CSS 实现：**
```css
#nd-page h2 {
  font-size: 26px;
  font-weight: 600;
  color: #1A1D23;
  line-height: 1.4;
  margin-top: 60px;
  margin-bottom: 24px;
}
```

---

### header-3 (H3 / ###)
- **Font Family:** Arial, "Microsoft YaHei", sans-serif
- **Font Size:** 20px
- **Font Weight:** 600 (SemiBold)
- **Line Height:** 1.5
- **使用场景：** 二级小节标题、卡片标题

**示例：** 管理层决策支持

**CSS 实现：**
```css
#nd-page h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1A1D23;
  line-height: 1.5;
  margin-top: 32px;
  margin-bottom: 10px;
}
```

---

## 文本 Typography - Body Text

### body-regular
- **Font Family:** Arial, "Microsoft YaHei", sans-serif
- **Font Size:** 16px
- **Font Weight:** 400 (Regular)
- **Line Height:** 26px
- **Color:** #4B5563
- **Margin:** 10px 0（段落间距）
- **使用场景：** 正文内容

**示例：** 生成周报月报，管理优选速率全面，做出明智决策。

**CSS 实现：**
```css
#nd-page p {
  line-height: 26px;
  margin: 10px 0;
}
```

---

### body-small
- **Font Family:** Arial, "Microsoft YaHei", sans-serif
- **Font Size:** 14px
- **Font Weight:** 400 (Regular)
- **Line Height:** 1.6
- **Color:** #6B7280
- **使用场景：** 辅助说明文字

---

### caption
- **Font Family:** Arial, "Microsoft YaHei", sans-serif
- **Font Size:** 12px
- **Font Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Color:** #9CA3AF
- **使用场景：** 标签、提示文字

---

## 间距系统 Spacing

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

---

## 圆角 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

---

## 阴影 Shadow

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## 内容模块规范 Content Module Specs

### 典型应用场景 Typical Application Scenarios
- **布局：** 垂直排列，每个场景一个 div
- **场景间距：** marginBottom: '24px'（最后一个场景无底边距）
- **H3 标题：** 手写 `<h3>` 标签，内部用 `<span>` 包裹标题文字
  - 字号：20px
  - 字重：500（外层），700（内层 span）
  - 颜色：#1A1D23
  - 行高：1.5
  - 边距：'0 0 12px 0'
- **正文：** `<p>` 标签
  - 字号：16px
  - 字重：400
  - 颜色：#4B5563
  - 行高：1.6
  - 边距：0
  - 关键词用 `<strong style={{ color: '#FF8800' }}>` 标橙色加粗
- **使用场景：** 展示产品的典型使用场景、应用案例

**完整样式：**
```jsx
<div style={{ margin: '32px 0' }}>
  <div style={{ marginBottom: '24px' }}>
    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1A1D23', lineHeight: 1.5, margin: '0 0 12px 0' }}>
      <span style={{ color: '#1A1D23', fontWeight: 700 }}>场景标题</span>
    </h3>
    <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
      场景描述，<strong style={{ color: '#FF8800' }}>关键词橙色加粗</strong>，其余正常显示。
    </p>
  </div>
  
  <div style={{ marginBottom: '24px' }}>
    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1A1D23', lineHeight: 1.5, margin: '0 0 12px 0' }}>
      <span style={{ color: '#1A1D23', fontWeight: 700 }}>第二个场景</span>
    </h3>
    <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
      描述内容...
    </p>
  </div>
  
  <div>
    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1A1D23', lineHeight: 1.5, margin: '0 0 12px 0' }}>
      <span style={{ color: '#1A1D23', fontWeight: 700 }}>最后一个场景</span>
    </h3>
    <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
      描述内容...
    </p>
  </div>
</div>
```

---

### 列表式优势展示 List-style Advantages
- **布局：** 垂直排列，每项一个 div，带底部分隔线
- **项目间距：** marginBottom: '24px', paddingBottom: '24px'
- **分隔线：** borderBottom: '1px solid rgba(0, 0, 0, 0.08)'（最后一项无分隔线）
- **文字样式：**
  - 字号：16px
  - 字重：400
  - 颜色：#4B5563
  - 行高：26px
  - 边距：0
  - 关键词用 `<span style={{ color: '#FF8800', fontWeight: 500 }}>` 标橙色加粗
  - 关键词与描述用 " —— " 分隔
- **使用场景：** 展示产品优势、特点列表

**完整样式：**
```jsx
<div style={{ margin: '32px 0' }}>
  <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
    <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: '26px', margin: 0 }}>
      <span style={{ color: '#FF8800', fontWeight: 500 }}>优势标题</span> —— 优势描述内容
    </p>
  </div>
  
  <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
    <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: '26px', margin: 0 }}>
      <span style={{ color: '#FF8800', fontWeight: 500 }}>第二个优势</span> —— 描述内容
    </p>
  </div>
  
  <div>
    <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: '26px', margin: 0 }}>
      <span style={{ color: '#FF8800', fontWeight: 500 }}>最后一个优势</span> —— 描述内容
    </p>
  </div>
</div>
```

---

## 组件规范 Component Specs

### 提示卡片 Tip Card
- **布局：** 横向 flex 布局，icon + 文字
- **图标尺寸：** h-5 w-5（20px × 20px）
- **图标颜色：** #FF8800
- **文字字号：** 16px
- **文字字重：** 400 (Regular)
- **文字颜色：** #1A1D23
- **行高：** 26px
- **间距：** icon 与文字间距 12px
- **上下边距：** 32px 0
- **使用场景：** 页面提示、温馨提示、注意事项

**完整样式：**
```jsx
<div style={{ display: 'flex', gap: '12px', alignItems: 'center', margin: '32px 0' }}>
  <div style={{ flexShrink: 0 }}>
    <Lightbulb className="h-5 w-5" style={{ color: '#FF8800' }} />
  </div>
  <p style={{ fontSize: '16px', fontWeight: 400, color: '#1A1D23', lineHeight: '26px', margin: 0 }}>
    <strong>提示：</strong>提示内容文字
  </p>
</div>
```

**注意：** 不再使用黄色背景框（#FFF9F0）和边框样式，保持简洁的 icon + 文字形式。

---

### 按钮 Button

#### 主要按钮 Primary Button
- **背景色：** var(--color-primary)
- **文字颜色：** #FFFFFF
- **内边距：** 12px 24px
- **圆角：** var(--radius-md)
- **Hover：** var(--color-primary-hover)
- **Active：** var(--color-primary-active)

#### 次要按钮 Secondary Button
- **背景色：** transparent
- **边框：** 1px solid var(--color-primary)
- **文字颜色：** var(--color-primary)
- **内边距：** 12px 24px
- **圆角：** var(--radius-md)

---

### 卡片 Card
- **背景色：** #FFFFFF
- **圆角：** var(--radius-lg)
- **阴影：** var(--shadow-md)
- **内边距：** var(--spacing-lg)

---

### 输入框 Input
- **高度：** 40px
- **边框：** 1px solid #D1D5DB
- **圆角：** var(--radius-md)
- **内边距：** 0 12px
- **Focus边框：** var(--color-primary)

---

### 表格 Table
- **宽度：** 100%
- **边框合并：** borderCollapse: 'collapse'
- **上下边距：** 32px 0
- **字号：** 16px
- **表头背景：** #E8EAED（深灰）
- **表头文字：** #1A1D23，字重 600
- **表头内边距：** 16px
- **表格行背景：** #FAFAFA（浅灰）
- **表格行文字：** #4B5563，字重 400
- **表格行内边距：** 16px
- **边框：** 1px solid rgba(0, 0, 0, 0.08)
- **行高：** 1.6

**完整样式：**
```jsx
<table style={{ width: '100%', borderCollapse: 'collapse', margin: '32px 0', fontSize: '16px' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '16px', background: '#E8EAED', fontWeight: 600, color: '#1A1D23', textAlign: 'left' }}>表头1</th>
      <th style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '16px', background: '#E8EAED', fontWeight: 600, color: '#1A1D23', textAlign: 'left' }}>表头2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '16px', background: '#FAFAFA', color: '#4B5563', lineHeight: 1.6 }}>内容1</td>
      <td style={{ border: '1px solid rgba(0, 0, 0, 0.08)', padding: '16px', background: '#FAFAFA', color: '#4B5563', lineHeight: 1.6 }}>内容2</td>
    </tr>
  </tbody>
</table>
```

---

## 响应式断点 Breakpoints

```css
--breakpoint-mobile: 375px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
```

---

## 通用组件样式 Common Components

### 图片排版格式

#### 格式一：装饰性图片（无容器）
用于企业版等营销页面，图片作为视觉装饰元素，不需要容器包裹。

- **宽度：** 100%
- **高度：** auto
- **显示：** block
- **上下边距：** 32px 0
- **圆角：** 12px
- **无容器、无边框、无背景**

**完整样式：**
```jsx
<img src="/images/about-zleap/enterprise-overview.png" alt="Zleap 企业版概览" style={{ width: '100%', height: 'auto', display: 'block', margin: '32px 0', borderRadius: '12px' }} />
```

**使用场景：** 
- 产品介绍页面的配图
- 营销页面的视觉元素
- 不需要用户交互的装饰性图片

**示例位置：** `content/docs/about-zleap/enterprise.mdx`

---

#### 格式二：可交互图片（带容器）
用于功能说明、操作指南等页面，图片需要点击放大查看细节。

- **最大宽度：** 100%（撑满页面宽度）
- **固定高度：** 400px
- **背景色：** #FAFAFA
- **内边距：** 24px
- **圆角：** 12px
- **边框：** 1px solid rgba(0, 0, 0, 0.04)
- **居中对齐：** flexbox 居中
- **图片适配：** object-fit: contain
- **交互：** cursor: pointer, hover 时 transform: scale(1.01)
- **点击放大：** 需在页面底部添加 `<ImageZoomOverlay />` 组件

**完整样式：**
```jsx
<div style={{ margin: '24px auto', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.04)', maxWidth: '100%', width: '100%', height: '400px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', cursor: 'pointer', transition: 'transform 0.2s' }}>
  <img src="/path/to/image.png" alt="描述" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'block', objectFit: 'contain' }} />
</div>

{/* 页面底部添加 */}
<ImageZoomOverlay />
```

**使用场景：** 
- 功能截图、操作步骤说明
- 需要查看细节的配置界面
- 用户需要放大查看的图片

**示例位置：** `content/docs/information-management/create-private/feishu-bot.mdx`

---

### 图片容器 Image Container（已废弃，请使用上方的格式二）
- **最大宽度：** 100%（撑满页面宽度）
- **固定高度：** 400px
- **背景色：** #FAFAFA
- **内边距：** 24px
- **圆角：** 12px
- **边框：** 1px solid rgba(0, 0, 0, 0.04)
- **居中对齐：** flexbox 居中
- **图片适配：** object-fit: contain
- **交互：** cursor: pointer, hover 时 transform: scale(1.01)
- **点击放大：** 需在页面底部添加 `<ImageZoomOverlay />` 组件

**完整样式：**
```jsx
<div style={{ margin: '24px auto', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.04)', maxWidth: '100%', width: '100%', height: '400px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', cursor: 'pointer', transition: 'transform 0.2s' }}>
  <img src="/path/to/image.png" alt="描述" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'block', objectFit: 'contain' }} />
</div>
```

---

### 链接样式 Link
- **颜色：** #FF8A00（橙色）
- **字重：** 500
- **无下划线**，hover 时显示下划线

**完整样式：**
```jsx
<a href="/path" style={{ color: '#FF8A00', textDecoration: 'none', fontWeight: 500 }}>链接文字</a>
```

---

### 强调提示框 Highlight Box（已废弃）

**注意：此组件已废弃，不再使用。** 所有提示信息统一使用上方的"提示卡片 Tip Card"（icon + 文字，无背景）。

<details>
<summary>历史参考（仅供了解，不要在新页面中使用）</summary>

- **背景色：** #FFF9F0（浅黄色）
- **边框：** 1px solid #FFE9CC
- **圆角：** 12px
- **内边距：** 20px 24px
- **上下边距：** 32px 0
- **图标：** CheckCircle, AlertCircle, Lightbulb 等（颜色 #FF8A00）

**完整样式：**
```jsx
<div style={{ background: '#FFF9F0', border: '1px solid #FFE9CC', borderRadius: '12px', padding: '20px 24px', margin: '32px 0' }}>
  <p style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: 1.7, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
    <CheckCircle className="h-5 w-5" style={{ color: '#FF8A00', flexShrink: 0 }} />
    提示内容
  </p>
</div>
```

</details>

---

## 内容处理规则 Content Processing Rules

### 灰色卡片（核心概念）处理
- **原样式：** 灰色背景（#898989）+ 橙色标签 + 白色文字
- **改为：** 普通段落，使用标准正文样式（16px/400/26px, #1A1D23）
- **原因：** 简化页面结构，避免过度设计

**示例：**
```jsx
// 旧格式（不再使用）
<div style={{ background: '#898989', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '32px' }}>
  <span style={{ background: '#FF8A00', color: '#fff' }}>核心概念</span>
  <h2 style={{ color: '#FFFFFF' }}>标题</h2>
  <p style={{ color: '#FFFFFF' }}>内容</p>
</div>

// 新格式（推荐）
<p style={{ fontSize: '16px', fontWeight: 400, color: '#1A1D23', lineHeight: '26px', margin: '12px 0 32px 0' }}>内容</p>
```

### 分隔线处理
- **规则：** 删除 `---` 分隔线，不再依赖分隔线划分内容
- **原因：** CSS 已设置 `display: none`，分隔线无实际作用
- **替代方案：** 使用标题层级和间距系统划分内容区块

### 段落合并
- **规则：** 语义连贯的多段落可以合并为一段
- **判断标准：** 
  - 多个段落表达同一个完整意思
  - 段落之间没有明显的逻辑转折
  - 合并后不影响可读性
- **注意：** 不要强行合并有明确分层的内容

### 内容精简
- **删除重复句子：** 同一信息不要在页面中多次表述
- **删除空泛表达：** 去掉"非常好""很强大"等无实际信息的修饰
- **删除解释过度：** 技术文档以清楚、直接、可执行为主
- **原则：** 页面表达以清楚、直接、可执行为主，不为了排版强行增加组件

---

## 特殊卡片样式 Special Cards

### 产品介绍卡片（透明背景 + 蓝色列表容器）
- **特点：** 用于产品介绍页面顶部，标签和标题透明背景，列表项放在蓝色容器中
- **外层容器：** 透明背景，margin: 0 0 32px 0
- **标签背景：** #FF8800
- **标签文字：** #FFFFFF, 17px, 字重 400
- **标签内边距：** 4px 12px
- **标签圆角：** 9999px (var(--radius-full))
- **主标题：** 22px, 字重 700, 颜色 #1A1D23
- **正文：** 16px, 字重 400, 行高 26px, 颜色 #1A1D23
- **列表容器背景：** #F0F8FF（淡蓝色）
- **列表容器圆角：** 16px
- **列表容器内边距：** 24px
- **列表项：** 16px, 字重 400, 行高 26px, 颜色 #1A1D23
- **列表圆点：** 橙色 #FF8800
- **适用场景：** 产品介绍页面顶部概述

**完整样式：**
```jsx
<div style={{ margin: '0 0 32px 0' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
    <span style={{ background: '#FF8800', color: '#FFFFFF', fontSize: '17px', fontWeight: 400, padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.05em', lineHeight: 1.5 }}>标签文字</span>
  </div>
  <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1D23', margin: '0 0 16px 0', lineHeight: 1.4 }}>主标题</h2>
  <div style={{ fontSize: '16px', fontWeight: 400, color: '#1A1D23', lineHeight: '26px', margin: '0 0 16px 0' }}>
    正文描述
  </div>
  <div style={{ background: '#F0F8FF', borderRadius: '16px', padding: '24px' }}>
    <ul style={{ fontSize: '16px', fontWeight: 400, color: '#1A1D23', lineHeight: '26px', margin: 0, paddingLeft: '24px', listStyleType: 'disc' }}>
      <li style={{ marginBottom: '8px' }}>列表项1</li>
      <li style={{ marginBottom: '8px' }}>列表项2</li>
      <li>列表项3</li>
    </ul>
  </div>
</div>
```

**CSS 样式（橙色列表圆点）：**
```css
/* 自定义列表圆点颜色 */
ul li::marker {
  color: #FF8800;
}
```

---

### 装饰图片 Decorative Image
- **特点：** 纯装饰用途，不可点击放大
- **宽度：** 100%（撑满页面宽度）
- **高度：** auto（保持图片比例）
- **圆角：** 12px（如果图片本身没有圆角）
- **上下边距：** 32px 0（var(--spacing-xl)）
- **显示方式：** block
- **适用场景：** 产品展示、功能说明等装饰性图片

**完整样式：**
```jsx
<img src="/images/path/to/image.png" alt="描述" style={{ width: '100%', height: 'auto', display: 'block', margin: '32px 0', borderRadius: '12px' }} />
```

**注意事项：**
- 不需要外层容器
- 不需要点击放大功能
- 图片应该已经处理好圆角
- 如果图片本身有圆角，可以省略 borderRadius 样��

---

## 卡片样式系统 Card Components

### 基础卡片1 - 图标标题分行
- **特点：** 左对齐，图标和标题分行显示
- **背景：** #FFFFFF
- **边框：** 1px solid rgba(0, 0, 0, 0.08)
- **圆角：** 12px (var(--radius-lg))
- **内边距：** 24px (var(--spacing-lg))
- **图标尺寸：** 48px × 48px
- **图标背景：** #FFF5E6 (var(--color-primary-light))
- **标题：** 20px, 字重 500, 行高 1.5 (header-3)
- **描述：** 16px, 字重 400, 行高 1.6, 颜色 #4B5563 (body-regular)
- **适用场景：** 常规信息展示

**完整样式：**
```jsx
<div style={{ border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '24px', background: '#FFFFFF' }}>
  <div style={{ width: '48px', height: '48px', background: '#FFF5E6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#FF8800' }}>
    <IconComponent className="h-6 w-6" />
  </div>
  <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1A1D23', lineHeight: 1.5, margin: '0 0 12px 0' }}>标题</h3>
  <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>描述文字</p>
</div>
```

---

### 基础卡片2 - 图标标题同行
- **特点：** 左对齐，图标和标题在同一行
- **背景：** #FFFFFF
- **边框：** 1px solid rgba(0, 0, 0, 0.08)
- **圆角：** 12px (var(--radius-lg))
- **内边距：** 24px (var(--spacing-lg))
- **图标尺寸：** 48px × 48px
- **图标背景：** #FFF5E6 (var(--color-primary-light))
- **标题：** 20px, 字重 500, 行高 1.5 (header-3)
- **描述：** 16px, 字重 400, 行高 1.6, 颜色 #4B5563 (body-regular)
- **适用场景：** 需要紧凑布局的信息展示

**完整样式：**
```jsx
<div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '24px' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
    <div style={{ width: '48px', height: '48px', background: '#FFF5E6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF8800', flexShrink: 0 }}>
      <IconComponent className="h-6 w-6" />
    </div>
    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1A1D23', lineHeight: 1.5, margin: 0 }}>标题</h3>
  </div>
  <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>描述文字</p>
</div>
```

---

### 强调卡片
- **特点：** 浅橙色背景，突出重要信息
- **背景：** #FFF5E6 (var(--color-primary-light))
- **边框：** 1px solid #FFE8CC (var(--color-primary-light-hover))
- **圆角：** 12px (var(--radius-lg))
- **内边距：** 24px (var(--spacing-lg))
- **图标背景：** #FF8800 (var(--color-primary))
- **图标颜色：** #FFFFFF
- **图标尺寸：** 48px × 48px
- **标题：** 20px, 字重 500, 行高 1.5 (header-3)
- **描述：** 16px, 字重 400, 行高 1.6, 颜色 #4B5563 (body-regular)
- **适用场景：** 需要强调的重要内容

**完整样式：**
```jsx
<div style={{ background: '#FFF5E6', border: '1px solid #FFE8CC', borderRadius: '12px', padding: '24px' }}>
  <div style={{ width: '48px', height: '48px', background: '#FF8800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#FFFFFF' }}>
    <IconComponent className="h-6 w-6" />
  </div>
  <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1A1D23', lineHeight: 1.5, margin: '0 0 12px 0' }}>标题</h3>
  <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>描述文字</p>
</div>
```

---

### 跳转卡片
- **特点：** 可点击，hover 时边框发光
- **背景：** #FFFFFF
- **边框：** 1px solid rgba(0, 0, 0, 0.08)
- **圆角：** 12px (var(--radius-lg))
- **内边距：** 24px (var(--spacing-lg))
- **图标尺寸：** 48px × 48px
- **图标背景：** #FFF5E6 (var(--color-primary-light))
- **标题：** 20px, 字重 500, 行高 1.5 (header-3)
- **描述：** 16px, 字重 400, 行高 1.6, 颜色 #4B5563 (body-regular)
- **hover 效果：**
  - 边框发光：box-shadow: 0 0 0 2px rgba(255, 136, 0, 0.5)
  - 轻微上移：transform: translateY(-2px)
- **适用场景：** 引导用户进入其他页面或功能

**完整样式：**
```jsx
<a href="/target-url" style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', cursor: 'pointer' }}>
  <div style={{ width: '48px', height: '48px', background: '#FFF5E6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#FF8800' }}>
    <IconComponent className="h-6 w-6" />
  </div>
  <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1A1D23', lineHeight: 1.5, margin: '0 0 12px 0' }}>标题</h3>
  <p style={{ fontSize: '16px', fontWeight: 400, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>描述文字</p>
</a>
```

**CSS hover 效果（需在页面 `<style>` 标签中添加）：**
```css
a[href^="/docs/"]:hover {
  box-shadow: 0 0 0 2px rgba(255, 136, 0, 0.5) !important;
  transform: translateY(-2px) !important;
}
```

---

### CTA 按钮卡片（强调+跳转）
- **特点：** 渐变背景 + 圆形图标 + 文字 + 箭头符号
- **背景：** linear-gradient(180deg, #FF8A00 0%, #FFB84D 100%)
- **文字颜色：** #FFFFFF
- **最小宽度：** 280px
- **内边距：** 16px 48px
- **圆角：** 16px (var(--radius-xl))
- **阴影：** 0 4px 16px rgba(255, 138, 0, 0.25)
- **图标容器：** 40px × 40px 白色圆形，橙色图标
- **标题：** 17px, 字重 700
- **箭头符号：** ›, 字号 20px, 字重 700
- **hover 效果：**
  - 阴影增强：0 6px 24px rgba(255, 138, 0, 0.4)
  - 向上移动：translateY(-2px)
  - 箭头向右移动：translateX(4px)
- **适用场景：** 重要的行动号召（CTA）

**完整样式：**
```jsx
<div style={{ margin: '90px 0', display: 'flex', justifyContent: 'center' }}>
  <a
    href="/target-url"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(180deg, #FF8A00 0%, #FFB84D 100%)', padding: '16px 48px', borderRadius: '16px', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 16px rgba(255, 138, 0, 0.25)', cursor: 'pointer', minWidth: '280px', justifyContent: 'center' }}
  >
    <div style={{ width: '40px', height: '40px', background: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF8800', flexShrink: 0 }}>
      <IconComponent className="h-5 w-5" />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <p style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>按钮文字</p>
      <span style={{ color: '#FFFFFF', fontSize: '20px', lineHeight: 1, fontWeight: 700 }}>›</span>
    </div>
  </a>
</div>
```
- **背景：** linear-gradient(180deg, #FF8A00 0%, #FFB84D 100%)
- **内边距：** 16px 48px
- **圆角：** 16px
- **阴影：** 0 4px 16px rgba(255, 138, 0, 0.25)
- **文字颜色：** #FFFFFF
- **字号：** 17px
- **字重：** 700
- **上下边距：** 90px 0
- **图标：** Lightbulb（白色圆形背景）

**完整样式：**
```jsx
<div style={{ margin: '90px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
  <a
    href="https://feedback-url"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(180deg, #FF8A00 0%, #FFB84D 100%)', padding: '16px 48px', borderRadius: '16px', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 16px rgba(255, 138, 0, 0.25)', cursor: 'pointer', minWidth: '280px', justifyContent: 'center' }}
    className="feedback-btn"
  >
    <div style={{ width: '40px', height: '40px', background: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF8A00', flexShrink: 0 }}>
      <Lightbulb className="h-5 w-5" />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <p style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>提交反馈意见</p>
      <span style={{ color: '#FFFFFF', fontSize: '20px', lineHeight: 1, fontWeight: 700 }}>›</span>
    </div>
  </a>
  <p style={{ fontSize: '17px', color: '#86868b', margin: '12px 0 0 0', textAlign: 'center' }}>
    描述文字
  </p>
</div>
```
