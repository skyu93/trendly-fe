# 빌드 스테이지
FROM node:18-alpine AS builder

# pnpm 설치 및 의존성 준비
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

# 의존성 파일만 먼저 복사 (캐싱 최적화)
COPY package.json pnpm-lock.yaml ./

# pnpm으로 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 빌드 버전 인자 추가
ARG BUILD_VERSION
ENV NEXT_PUBLIC_BUILD_VERSION=${BUILD_VERSION}

# TypeScript 타입 체크 및 애플리케이션 빌드
RUN pnpm run build

# 프로덕션 스테이지
FROM node:18-alpine AS production

WORKDIR /app

# 환경 설정
ENV NODE_ENV=production
ENV PORT=80
ENV CI=true

# pnpm 설치
RUN npm install -g pnpm

# 필요한 파일만 복사
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# 프로덕션 의존성만 설치
RUN pnpm install --prod --frozen-lockfile

# 포트 설정
EXPOSE 80

# 애플리케이션 실행
CMD ["pnpm", "start"]
