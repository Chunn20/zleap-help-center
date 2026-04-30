#!/bin/bash

# 标准格式的 CSS 样式
read -r -d '' NEW_STYLE << 'EOF'
  /* 调整页面标题（H1）和描述文字的距离 */
  #nd-page > h1 {
    font-size: 36px !important;
    margin-bottom: 0px !important;
  }

  /* 调整描述文字的上边距 */
  #nd-page > h1 + p {
    margin-top: 0 !important;
    margin-bottom: 20px !important;
  }

  /* H2 标题样式 */
  #nd-page h2 {
    font-size: 26px;
    font-weight: 600;
    color: #1A1D23;
    line-height: 1.4;
    margin-top: 60px;
    margin-bottom: 24px;
  }

  /* 第一个 H2 标题样式（紧跟描述文字） */
  #nd-page > p + h2 {
    margin-top: 40px;
  }

  /* H3 标题样式 */
  #nd-page h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1A1D23;
    line-height: 1.5;
    margin-top: 32px;
    margin-bottom: 10px;
  }

  /* 正文行间距 */
  #nd-page p {
    line-height: 26px;
    margin: 10px 0;
  }

  /* 移除分隔线 */
  #nd-page hr {
    display: none;
  }
EOF

# 需要更新的文件列表
files=(
  "content/docs/information-management/source-list.mdx"
  "content/docs/information-management/source-logs.mdx"
  "content/docs/support/agent-vs-human.mdx"
  "content/docs/support/changelog.mdx"
  "content/docs/support/language-settings.mdx"
  "content/docs/support/notification-center.mdx"
  "content/docs/information-management/create-private/api.mdx"
  "content/docs/information-management/create-private/browser-extension.mdx"
  "content/docs/information-management/create-private/document-upload.mdx"
  "content/docs/information-management/create-private/feishu-bot.mdx"
  "content/docs/information-management/create-private/gitee.mdx"
  "content/docs/information-management/create-private/github.mdx"
  "content/docs/information-management/create-private/gitlab.mdx"
  "content/docs/information-management/create-private/index.mdx"
  "content/docs/information-management/create-private/rss.mdx"
  "content/docs/information-management/create-private/salesmartly.mdx"
  "content/docs/information-management/create-private/search-engine.mdx"
  "content/docs/information-management/create-private/web-crawler.mdx"
  "content/docs/information-management/create-private/wecom-bot.mdx"
  "content/docs/information-management/info-search/index.mdx"
  "content/docs/information-management/info-search/knowledge-graph.mdx"
  "content/docs/information-management/info-search/text-results.mdx"
)

echo "开始更新 ${#files[@]} 个文件..."

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "处理: $file"
    # 使用 sed 替换旧的样式为新的标准格式
    # 这里使用 Python 来处理，因为 sed 处理多行替换比较复杂
    python3 << PYTHON
import re

with open('$file', 'r', encoding='utf-8') as f:
    content = f.read()

# 匹配并替换 style 标签中的内容
pattern = r'(<style>\{\`\s*)(.*?)(\s*\`\}</style>)'
def replace_style(match):
    return match.group(1) + '''$NEW_STYLE''' + match.group(3)

content = re.sub(pattern, replace_style, content, flags=re.DOTALL)

with open('$file', 'w', encoding='utf-8') as f:
    f.write(content)
PYTHON
  else
    echo "文件不存在: $file"
  fi
done

echo "完成！"
