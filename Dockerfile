FROM node:14-alpine

RUN npm install -g cnpm -registry=https://registry.npm.taobao.org

ADD . .

RUN npm install -g npm

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]

