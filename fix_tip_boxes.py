import os
import re

# 定义要处理的目录
directories = [
    'content/docs/information-management/create-private',
    'content/docs/information-management',
    'content/docs/about-zleap',
    'content/docs/getting-started',
    'content/docs/support',
    'content/docs/contact'
]

# 旧的样式（没有背景色）
old_pattern = r"<div style=\{\{ display: 'flex', gap: '12px', alignItems: 'center', margin: '32px 0' \}\}>"

# 新的样式（有背景色）
new_style = "<div style={{ display: 'flex', gap: '12px', alignItems: 'center', margin: '32px 0', background: '#FAFAFA', padding: '16px 20px', borderRadius: '12px' }}>"

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否有需要修复的提示框
        if re.search(old_pattern, content):
            # 替换
            new_content = re.sub(old_pattern, new_style, content)

            # 写回文件
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

# 处理所有文件
fixed_count = 0
for directory in directories:
    if os.path.exists(directory):
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith('.mdx'):
                    filepath = os.path.join(root, file)
                    if fix_file(filepath):
                        print(f"Fixed: {filepath}")
                        fixed_count += 1

print(f"\nTotal files fixed: {fixed_count}")
