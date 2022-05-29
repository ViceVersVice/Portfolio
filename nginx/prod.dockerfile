FROM nginx:1.21.6-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-prod.conf /etc/nginx/conf.d
# Certs
COPY fullchain.pem /etc/nginx/certs/fullchain.pem
COPY privkey.pem /etc/nginx/certs/privkey.pem