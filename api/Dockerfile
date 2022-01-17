FROM mhart/alpine-node:14
#RUN apk add --no-cache make gcc g++ python
RUN mkdir /api
WORKDIR /api
COPY ./src /api/src
COPY ./package.json /api/
COPY ./package-lock.json /api/
#ADD .env-template /layout/.env
RUN npm i
CMD ["node", "./src"]
EXPOSE 3000