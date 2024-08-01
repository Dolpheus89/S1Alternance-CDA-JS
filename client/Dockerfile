FROM node:lts-alpine

RUN mkdir /webapp
WORKDIR /webapp

COPY package*.json ./
RUN npm i
COPY . .

CMD npm run dev