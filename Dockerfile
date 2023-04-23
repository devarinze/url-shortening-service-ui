FROM node:16-alpine AS build
WORKDIR /app

RUN export NODE_OPTIONS=--max-old-space-size=8192
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/tinyurl-ui /usr/share/nginx/html
