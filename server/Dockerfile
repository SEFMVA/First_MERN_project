FROM node:10

RUN npm install -g nodemon

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/

RUN npm install

COPY . /app/server/

#EXPOSE 4000

CMD ["npm", "start"]