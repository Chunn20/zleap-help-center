#!/bin/bash

files=(
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

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    # 替换 H1 样式
    sed -i 's/margin-bottom: 0px !important;/font-size: 36px !important;\n    margin-bottom: 0px !important;/g' "$file"
    # 替换 H2 样式
    sed -i 's/font-size: 24px;/font-size: 26px;/g' "$file"
    sed -i 's/font-weight: 700;/font-weight: 600;/g' "$file"
    sed -i 's/color: #1d1d1f;/color: #1A1D23;/g' "$file"
    sed -i 's/letter-spacing: -0.02em;//g' "$file"
    sed -i 's/line-height: 1.3;/line-height: 1.4;/g' "$file"
    sed -i 's/margin-top: 40px;/margin-top: 60px;/g' "$file"
  fi
done

echo "Done!"
