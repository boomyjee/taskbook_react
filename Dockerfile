FROM node:10-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci

COPY . /opt/app

EXPOSE 8080

RUN npm install --dev && npm run build

CMD [ "node", "./server/index.js" ]
