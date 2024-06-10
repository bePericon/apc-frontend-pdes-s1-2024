#Base image: nodejs - version: 
FROM node:18.20-alpine

#Setting enviroment variables
ENV HOME=/opt/app
ENV PORT=3000

#Setting work directory
WORKDIR $HOME

#Install
COPY package.json $HOME
RUN npm install -f --quiet

#Copy app
COPY next-logger.config.js $HOME
COPY next.config.mjs $HOME
COPY ./public $HOME/public
COPY ./src $HOME/src
COPY styled.d.ts $HOME
COPY tsconfig.json $HOME
COPY jest.config.mjs $HOME
COPY jest.setup.mjs $HOME
COPY .env.production $HOME/.env

RUN npm run build

#Expose port 8080
EXPOSE $PORT

#Start app
CMD npm run start