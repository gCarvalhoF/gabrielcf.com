# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

# PUBLIC_* vars are inlined into the client bundle at build time by Vite, so this
# must be a build arg, not a runtime -e. It's not secret, unlike the GitHub App
# client ID/secret and session key, which are runtime-only (see docker-compose.yml).
ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
ENV PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=$PUBLIC_KEYSTATIC_GITHUB_APP_SLUG

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-alpine AS runtime
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json

USER node
CMD ["node", "./dist/server/entry.mjs"]
