FROM node:20.10.0-alpine AS deps
WORKDIR /deps
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20.10.0-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /build
COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.10.0-alpine AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
EXPOSE 3000
USER node
WORKDIR /app
COPY --from=builder /build/public ./public
COPY --from=builder --chown=node:node /build/.next/standalone ./
COPY --from=builder --chown=node:node /build/.next/static ./.next/static
CMD ["node", "server.js"]