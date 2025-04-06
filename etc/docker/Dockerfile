FROM node:22-alpine AS builder

WORKDIR /app
COPY code/ ./

ARG APP_NAME ${APP_NAME}
ARG APP_VERSION ${APP_VERSION}

RUN yarn --cwd code install
RUN yarn --cwd code build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY etc/docker/nginx.conf /etc/nginx/
EXPOSE 80