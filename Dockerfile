FROM node:20


WORKDIR /usr/src/app/
COPY ./package*.json .
RUN npm install

# Setup server
WORKDIR /usr/src/app/server
COPY ./server/package*.json .
RUN npm install
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