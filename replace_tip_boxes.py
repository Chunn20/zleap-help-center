#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os

# 需要处理的文件列表
files = [
    "content/docs/information-management/create-private/api.mdx",
    "content/docs/information-management/create-private/browser-extension.mdx",
    "content/docs/information-management/create-private/document-upload.mdx",
    "content/docs/information-management/create-private/feishu-bot.mdx",
    "content/docs/information-management/create-private/gitee.mdx",
    "content/docs/information-management/create-private/github.mdx",
    "content/docs/information-management/create-private/gitlab.mdx",
    "content/docs/information-management/create-private/rss.mdx",
    "content/docs/information-management/create-private/salesmartly.mdx",
    "content/docs/information-management/create-private/search-engine.mdx",
    "content/docs/information-management/create-private/wecom-bot.mdx",
    "content/docs/information-management/info-search/index.mdx",
    "content/docs/information-management/info-search/knowledge-graph.mdx",
    "content/docs/information-management/info-search/text-results.mdx",
    "content/docs/information-management/source-list.mdx",
    "content/docs/information-management/source-logs.mdx",
    "content/docs/support/agent-vs-human.mdx",
    "content/docs/support/language-settings.mdx",
]

def replace_tip_boxes(content):
    """替换黄色提示框为简单的 icon + 文字格式"""

    # 匹配黄色提示框的正则表达式
    pattern = r'<div style=\{\{ background: [\'"]#FFF9F0[\'"], border: [\'"]1px solid #FFE9CC[\'"], borderRadius: [\'"]12px[\'"], padding: [\'"][^"\']+[\'"], margin: [\'"][^"\']+[\'"], display: [\'"]flex[\'"], gap: [\'"]12px[\'"], alignItems: [\'"]center[\'"] \}\}>\s*<div style=\{\{ flexShrink: 0 \}\}>\s*<(\w+) className="h-5 w-5" style=\{\{ color: [\'"]#FF8A00[\'"] \}\} />\s*</div>\s*<p style=\{\{ fontSize: [\'"]14px[\'"], color: [\'"]#1d1d1f[\'"], lineHeight: [^,]+, margin: 0 \}\}>\s*(.*?)\s*</p>\s*</div>'

    def replacer(match):
        icon_name = match.group(1)
        content_text = match.group(2)

        return f'''<div style={{{{ display: 'flex', gap: '12px', alignItems: 'center', margin: '32px 0' }}}}>
  <div style={{{{ flexShrink: 0 }}}}>
    <{icon_name} className="h-5 w-5" style={{{{ color: '#FF8800' }}}} />
  </div>
  <p style={{{{ fontSize: '16px', fontWeight: 400, color: '#1A1D23', lineHeight: '26px', margin: 0 }}}}>
    {content_text}
  </p>
</div>'''

    return re.sub(pattern, replacer, content, flags=re.DOTALL)

def process_file(filepath):
    """处理单个文件"""
    if not os.path.exists(filepath):
        print(f"文件不存在: {filepath}")
        return False

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否包含黄色提示框
        if "background: '#FFF9F0'" not in content and 'background: "#FFF9F0"' not in content:
            print(f"- 无需处理: {filepath}")
            return False

        new_content = replace_tip_boxes(content)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ 已更新: {filepath}")
            return True
        else:
            print(f"- 无变化: {filepath}")
            return False
    except Exception as e:
        print(f"✗ 错误 {filepath}: {e}")
        return False

def main():
    print(f"开始处理 {len(files)} 个文件...\n")

    updated_count = 0
    for filepath in files:
        if process_file(filepath):
            updated_count += 1

    print(f"\n完成！成功更新 {updated_count}/{len(files)} 个文件。")

if __name__ == "__main__":
    main()
