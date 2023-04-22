FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist/isura-ui /usr/share/nginx/html
