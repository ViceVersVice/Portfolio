FROM nginx:1.21.6-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
# Letsencrypt
COPY /etc/letsencrypt/live/kholiavskyi-portfolio.app/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY /etc/letsencrypt/live/kholiavskyi-portfolio.app/privkey.pem /etc/nginx/certs/privkey.pem