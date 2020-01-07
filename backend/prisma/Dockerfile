FROM node:12-slim

RUN npm i -g --unsafe-perm prisma2

RUN mkdir /app
WORKDIR /app

COPY ./ ./prisma/

CMD ["echo", "dev"]