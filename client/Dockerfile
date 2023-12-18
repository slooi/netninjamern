FROM node:20-alpine
WORKDIR /usr/src/app/client
COPY package*.json .
RUN npm install
COPY . .
COPY ../server ../server
EXPOSE 5173
CMD ["npm", "run", "dev"]