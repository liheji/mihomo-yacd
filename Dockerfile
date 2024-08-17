# Builder
FROM --platform=linux/amd64 node:20-alpine AS builder
WORKDIR /app

RUN npm i -g pnpm

COPY . .
RUN pnpm i

RUN pnpm build \
  # remove source maps - people like small image
  && rm public/*.map || true

# Release
FROM metacubex/mihomo:v1.18.7

# install nginx
RUN apk update && apk add nginx

ADD docker/default.conf /etc/nginx/http.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/public /usr/share/nginx/html
ADD docker/start.sh /
ENTRYPOINT [ "sh", "/start.sh" ]
