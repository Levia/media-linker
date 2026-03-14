# ─── Build stage (install deps) ───────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app/server

# Copy only the manifests first to leverage Docker layer caching
COPY server/package*.json ./

RUN npm ci --omit=dev


# ─── Runtime stage ────────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy production node_modules from the deps stage
COPY --from=deps /app/server/node_modules ./server/node_modules

# Copy server source and client assets
COPY server/ ./server/
COPY client/ ./client/

WORKDIR /app/server

# Expose the port the Express server listens on
EXPOSE 3000

# Use the start script defined in server/package.json
CMD ["node", "index.js"]