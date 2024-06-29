FROM arm32v7/node:20.13

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install cors

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]