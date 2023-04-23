FROM node:16-alpine AS build
WORKDIR /app

RUN export NODE_OPTIONS=--max-old-space-size=8192
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "start"]
