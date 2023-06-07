FROM node:20.2-alpine3.17 AS base

RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm exec tsc

EXPOSE 5001/tcp
EXPOSE 5001/udp

CMD ["node","./dist/server.js"]
