FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . /usr/app

EXPOSE $PORT