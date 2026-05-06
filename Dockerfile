# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 配置阿里云 npm 镜像
RUN npm config set registry https://registry.npmmirror.com

# 复制所有文件
COPY . .

# 安装依赖
RUN npm install

# 构建项目
RUN npm run build

# 生产阶段
FROM node:20-alpine AS runner

WORKDIR /app

# 配置阿里云 npm 镜像
RUN npm config set registry https://registry.npmmirror.com

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 复制必要文件（包括 source.config.ts，因为 fumadocs-mdx postinstall 需要）
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/source.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 安装所有依赖（fumadocs-mdx postinstall 需要 dev 依赖）
RUN npm install && npm cache clean --force

EXPOSE 3000

CMD ["node", "server.js"]
