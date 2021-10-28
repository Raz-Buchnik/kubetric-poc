FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm i --only=prod

COPY . . 

CMD ["npm", "run", "dev"] 