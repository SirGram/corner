# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.2.0
FROM node:${NODE_VERSION}-alpine AS base

LABEL fly_launch_runtime="Vite"
WORKDIR /app
ENV NODE_ENV="production"

# Build stage with temporary dependencies
FROM base AS build

# Copy package files first for better caching
COPY --link package.json package-lock.json ./

# Install, build, and clean up in a single layer
RUN --mount=type=bind,target=/app-src,ro \
    --mount=type=cache,target=/root/.npm \
    apk add --no-cache --virtual .build-deps build-base python3 pkgconfig && \
    cp -r /app-src/. . && \
    npm ci --include=dev && \
    npm run build && \
    apk del .build-deps

# Final production image
FROM nginx:alpine

# Configure Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]