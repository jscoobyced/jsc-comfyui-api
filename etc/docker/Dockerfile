FROM node:25-alpine AS builder

WORKDIR /app
COPY code/ ./

ARG APP_NAME ${APP_NAME}
ARG APP_VERSION ${APP_VERSION}

RUN yarn --cwd code install
RUN yarn --cwd code build

FROM node:25-alpine

WORKDIR /app
RUN mkdir -p node_modules
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
EXPOSE 3000

CMD ["node", "/app/index.js"]