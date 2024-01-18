FROM node:18-alpine
WORKDIR /client
COPY package.json .
RUN npm install -g npm@10.3.0
COPY . .
CMD npm start