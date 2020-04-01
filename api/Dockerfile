FROM node:13.12.0-alpine3.10

ENV PORT 8090

WORKDIR /srv/app/

COPY package.json .

RUN yarn

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "start"]