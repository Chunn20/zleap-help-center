#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os

# 标准格式的 CSS 样式
NEW_STYLE = """  /* 调整页面标题（H1）和描述文字的距离 */
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
  }"""

# 需要更新的文件列表
files = [
    "content/docs/information-management/source-list.mdx",
    "content/docs/information-management/source-logs.mdx",
    "content/docs/support/agent-vs-human.mdx",
    "content/docs/support/changelog.mdx",
    "content/docs/support/language-settings.mdx",
    "content/docs/support/notification-center.mdx",
    "content/docs/information-management/create-private/api.mdx",
    "content/docs/information-management/create-private/browser-extension.mdx",
    "content/docs/information-management/create-private/document-upload.mdx",
    "content/docs/information-management/create-private/feishu-bot.mdx",
    "content/docs/information-management/create-private/gitee.mdx",
    "content/docs/information-management/create-private/github.mdx",
    "content/docs/information-management/create-private/gitlab.mdx",
    "content/docs/information-management/create-private/index.mdx",
    "content/docs/information-management/create-private/rss.mdx",
    "content/docs/information-management/create-private/salesmartly.mdx",
    "content/docs/information-management/create-private/search-engine.mdx",
    "content/docs/information-management/create-private/web-crawler.mdx",
    "content/docs/information-management/create-private/wecom-bot.mdx",
    "content/docs/information-management/info-search/index.mdx",
    "content/docs/information-management/info-search/knowledge-graph.mdx",
    "content/docs/information-management/info-search/text-results.mdx",
]

def update_file(filepath):
    """更新单个文件的样式"""
    if not os.path.exists(filepath):
        print(f"文件不存在: {filepath}")
        return False

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 匹配 <style>{` 到 `}</style> 之间的内容
        pattern = r'(<style>\{\`\s*)(.*?)(\s*\`\}</style>)'

        def replace_style(match):
            return match.group(1) + NEW_STYLE + match.group(3)

        new_content = re.sub(pattern, replace_style, content, flags=re.DOTALL)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ 已更新: {filepath}")
            return True
        else:
            print(f"- 无需更新: {filepath}")
            return False
    except Exception as e:
        print(f"✗ 错误 {filepath}: {e}")
        return False

def main():
    print(f"开始更新 {len(files)} 个文件...\n")

    updated_count = 0
    for filepath in files:
        if update_file(filepath):
            updated_count += 1

    print(f"\n完成！成功更新 {updated_count}/{len(files)} 个文件。")

if __name__ == "__main__":
    main()
