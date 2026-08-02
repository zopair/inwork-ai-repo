# Stage 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/api-server/package.json ./apps/api-server/
RUN npm install
COPY . .
# تجميع الـ TypeScript إن وجد أو تحضير الملفات
RUN npm run build --if-present || true

# Stage 2: Production Runtime Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=MVP-PRODUCTION
ENV PORT=3000

# نسخ الاعتماديات والملفات المبنية فقط من الستيج الأول
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-server ./apps/api-server
COPY --from=builder /app/src ./src
COPY VERSION.md ./

EXPOSE 3000

CMD ["npx", "tsx", "apps/api-server/src/app.ts"]
