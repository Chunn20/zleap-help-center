# 更新日志管理系统 - 部署说明

## 功能说明

提供了一个管理后台，可以通过网页直接发布更新日志，无需修改代码。

## 部署步骤

### 1. 环境变量配置

在服务器上创建 `.env.local` 文件（或在部署平台配置环境变量）：

```bash
CHANGELOG_ADMIN_PASSWORD=你设置的密码
```

**注意**：
- 如果不配置，默认密码是 `zleap2024`
- 建议在生产环境设置一个强密码

### 2. 创建数据目录

在项目根目录创建 `data` 目录，并确保有写入权限：

```bash
mkdir -p data
chmod 755 data
```

### 3. 初始化数据文件

如果 `data/changelog.json` 不存在，创建一个空数组：

```bash
echo "[]" > data/changelog.json
```

或者从开发环境复制现有的 `changelog.json` 文件到服务器。

### 4. 构建和启动

```bash
npm install
npm run build
npm start
```

## 使用方法

### 管理员发布更新日志

1. 访问：`https://你的域名/admin/changelog`
2. 输入密码
3. 粘贴更新内容，格式如下：

```
V1.8.0 2026.5.6
新增
支持生成 HTML 格式报告
来源详情支持飞书多张图片展示
支持通过 Agent 聊天生成报告
优化
修复了一些 Bug，提升用户体验
```

4. 点击"发布"按钮
5. 自动跳转到更新日志页面查看效果

### 用户查看更新日志

访问：`https://你的域名/docs/support/changelog`

## 注意事项

### 数据持久化

- `data/changelog.json` 文件包含所有更新日志数据
- **重要**：部署时不要覆盖这个文件
- 建议定期备份这个文件

### 权限控制

建议在 Nginx/Apache 配置中限制 `/admin` 路径的访问：

**Nginx 示例**（只允许公司内网访问）：
```nginx
location /admin {
    allow 192.168.0.0/16;  # 公司内网 IP 段
    deny all;
}
```

### 备份建议

定期备份 `data/changelog.json` 文件：

```bash
# 每天自动备份（crontab）
0 2 * * * cp /path/to/data/changelog.json /path/to/backup/changelog-$(date +\%Y\%m\%d).json
```

## 文件说明

- `app/admin/changelog/page.tsx` - 管理后台页面
- `app/api/changelog/route.ts` - 数据保存 API
- `app/api/changelog/auth/route.ts` - 密码验证 API
- `app/components/ChangelogDynamic.tsx` - 动态渲染组件
- `data/changelog.json` - 数据存储文件
- `.env.local` - 环境变量配置（不上传 Git）
- `.env.example` - 环境变量示例

## 故障排查

### 问题1：无法保存数据

**原因**：`data` 目录没有写入权限

**解决**：
```bash
chmod 755 data
chmod 644 data/changelog.json
```

### 问题2：密码验证失败

**原因**：环境变量未正确配置

**解决**：检查 `.env.local` 文件是否存在，或在部署平台配置 `CHANGELOG_ADMIN_PASSWORD` 环境变量

### 问题3：页面显示空白

**原因**：`changelog.json` 文件不存在或格式错误

**解决**：
```bash
echo "[]" > data/changelog.json
```

## 技术支持

如有问题，请联系开发团队。
