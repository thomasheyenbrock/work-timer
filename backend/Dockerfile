FROM node:12-slim

RUN npm i -g --unsafe-perm prisma2
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY src ./src

RUN yarn
RUN prisma2 generate

CMD ["yarn", "start"]