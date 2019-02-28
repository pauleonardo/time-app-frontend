FROM node:8
WORKDIR /usr/src/appFrontend
COPY package*.json ./
RUN npm install
EXPOSE 3000

COPY . .

RUN sleep 10

CMD ["npm", "start"]
