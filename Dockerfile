FROM node:20.2-alpine3.17 AS base

RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY . .
RUN pnpm install
