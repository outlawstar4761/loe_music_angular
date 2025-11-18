# --- Build stage ---
FROM node:20-bullseye AS build
WORKDIR /app

# Copy dependencies first for caching
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# --- Runtime stage ---
FROM node:20-bullseye
WORKDIR /app

# Copy built app from build stage
COPY --from=build /app/dist ./dist
COPY entrypoint.sh ./entrypoint.sh
COPY server.js ./server.js

# Install a tiny static server, e.g. serve
RUN npm install express

# Expose port
EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "./server.js"]
