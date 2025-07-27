# Dockerfile

# --- Build Stage ---
# Pinning to Bun version 1.2.18-alpine for deterministic builds and stability.
FROM oven/bun:1.2.18-alpine AS builder

WORKDIR /app

# Copy package.json and bun.lock first to leverage Docker layer caching
COPY package.json bun.lock ./

# Install dependencies using Bun.
RUN bun install --frozen-lockfile

# Copy the rest of your application source code
COPY . .

# Build your Next.js application
# Ensure your next.config.js has:
# module.exports = { output: 'standalone' };
RUN bun run build

# --- Production Stage ---
# Pinning to the same Bun version (1.2.18-alpine) for the runtime.
FROM oven/bun:1.2.18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# 1. Copy the standalone output:
COPY --from=builder /app/.next/standalone ./

# 2. Copy the public directory:
COPY --from=builder /app/public ./public

# 3. Copy the Next.js generated static assets:
COPY --from=builder /app/.next/static ./.next/static

# Expose the port that the Next.js server will listen on
EXPOSE ${PORT}

# Start the Next.js application directly with the 'bun' executable.
CMD ["bun", "server.js"]
