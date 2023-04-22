FROM node:16-alpine AS build
WORKDIR /app

COPY . /app
RUN npm install
RUN npm run build --prod

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/tinyurl-ui /usr/share/nginx/html
