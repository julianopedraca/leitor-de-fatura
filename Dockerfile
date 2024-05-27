FROM node:22-alpine

#Create a app directory
WORKDIR /app

COPY ./express .

#Run npm install
RUN npm install

RUN npm run build

