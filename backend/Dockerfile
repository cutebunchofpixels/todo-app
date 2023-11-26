FROM node:21

WORKDIR /app

COPY ./package*.json .
RUN npm install

COPY . .

EXPOSE ${BACKEND_PORT}
CMD ["npm", "run", "start:dev"]