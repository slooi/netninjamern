FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# ENV PORT=8000
# ENV MONGO_HOST=127.0.0.1
# ENV NODE_ENV=development

EXPOSE 8000

CMD ["npm", "run", "dev"]

