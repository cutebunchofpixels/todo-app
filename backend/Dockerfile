FROM node:21

WORKDIR /app

COPY ./package*.json .
RUN npm install

COPY . .

EXPOSE ${BACKEND_PORT}
CMD ["node", "./dist/src/main.js"]