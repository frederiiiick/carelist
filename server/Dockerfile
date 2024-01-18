FROM node:18-alpine
WORKDIR /server
COPY package.json .
RUN npm install -g npm@10.3.0
COPY . .
CMD npm run dev