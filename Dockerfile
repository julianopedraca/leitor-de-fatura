FROM node:22-alpine

#Create a app directory
WORKDIR /app

#Install app dependencies
COPY ./express .

#Run npm install
RUN npm install

CMD [ "npm", "run", "dev"]