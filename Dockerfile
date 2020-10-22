FROM node:14-alpine

RUN npm install -g cnpm -registry=https://registry.npm.taobao.org

ADD . .

RUN cnpm install

EXPOSE 8081

CMD ["npm", "run serve"]

