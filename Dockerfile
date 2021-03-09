FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE $PORT

CMD npm run dev