FROM node:latest

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ARG PORT
ENV PORT $PORT

ARG DB_REGION
ENV DB_REGION $DB_REGION

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE $PORT

CMD [ "node", "index.js" ]