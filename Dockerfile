FROM node:20

WORKDIR /usr/src/app/
COPY ./package*.json .
RUN npm install

# Setup server
WORKDIR /usr/src/app/server
COPY ./server/package*.json .
RUN npm install
ENV PORT=8000
# WARNING MAKE SURE TO CHANGE 127.0.0.1 to a container name when using docker compose!!!
ENV MONGO_HOST=127.0.0.1
ENV NODE_ENV=development
COPY ./server .
EXPOSE 8000

# Setup client
WORKDIR /usr/src/app/client
COPY ./client/package*.json .
RUN npm install
COPY ./client .
EXPOSE 5173


WORKDIR /usr/src/app/

CMD ["npm","run","dev"]