FROM node:16-alpine AS build
WORKDIR /app

COPY . .
RUN npm install
RUN ls -la /app/src/environments/
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/tinyurl-ui /usr/share/nginx/html
