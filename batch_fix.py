import re
import sys

files = [
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

standard_style = """  /* 调整页面标题（H1）和描述文字的距离 */
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

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配 <style>{` 到 `}</style> 之间的所有内容
        pattern = r'<style>\{\`(.*?)\`\}</style>'
        
        def replace_func(match):
            old_style = match.group(1)
            # 保留响应式部分（如果有）
            responsive_match = re.search(r'(/\* 响应式 \*/.*)', old_style, re.DOTALL)
            if responsive_match:
                return f'<style>{{\`{standard_style}\n\n{responsive_match.group(1)}\`}}</style>'
            else:
                return f'<style>{{\`{standard_style}\`}}</style>'
        
        new_content = re.sub(pattern, replace_func, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ {filepath}")
        else:
            print(f"- {filepath} (unchanged)")
            
    except Exception as e:
        print(f"✗ {filepath}: {e}")

print("\nDone!")
