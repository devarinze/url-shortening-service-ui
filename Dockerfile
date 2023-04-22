FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist/tinyurl-ui /usr/share/nginx/html
