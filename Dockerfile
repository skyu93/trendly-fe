# 빌드 스테이지
FROM node:18-alpine AS builder

# pnpm 설치
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

# 의존성 파일 복사
COPY pnpm-lock.yaml ./
COPY package.json ./

# pnpm으로 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# TypeScript 타입 체크 및 애플리케이션 빌드
RUN pnpm run type-check && pnpm run build

# 프로덕션 스테이지 - 더 가벼운 이미지 사용
FROM node:18-alpine AS production

# pnpm 설치
RUN npm install -g pnpm

WORKDIR /app

# 환경 설정
ENV NODE_ENV=production

# 빌드 결과물만 복사
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# 프로덕션 의존성만 설치
RUN pnpm install --prod --frozen-lockfile

# 포트 설정
EXPOSE 80

# 애플리케이션 실행
CMD ["pnpm", "start"]
