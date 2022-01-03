FROM node:14
ENV NODE_ENV=development

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]