# => Build container
FROM node:14.15.4-alpine3.10 as builder
WORKDIR /app
#RUN mkdir /app/src
#RUN mkdir /app/public
COPY package.json .
COPY package-lock.json .
COPY src /app/src
COPY public /app/public
RUN npm i
#COPY . .
RUN npm run build

# => Run container
FROM nginx:1.15.2-alpine

# Nginx config
# RUN rm -rf /etc/nginx/conf.d
#COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env-template ./.env

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]