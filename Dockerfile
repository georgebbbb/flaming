FROM node:4.2.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN cd /usr/src/app/; npm install
EXPOSE 8080

ENTRYPOINT npm run start
