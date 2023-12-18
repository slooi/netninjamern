
# DEVELOPMENT using Docker
- **requirements**: 
	- docker installed
	- git installed 

1) Clone repo `git clone <repository-name>`

2) Chang directory into the repo: `cd <repository-name>`

3) To prevent potential conflicts with old docker run: `docker system prune -a`

4) run: `docker-compose up`


# DEVELOPMENT (old version)

## Setup
- The current setup requires you to use **TWO** separate terminal windows. One for the frontend vite server, and one for the backend express server.

1) Clone repo `git clone`
2) Create another terminal for your client or server
3) **Client Setup**

	3.1) move into client folder: `cd client`

	3.2) `npm i`

	3.3) Run dev server: `npm run dev`
4) **Server Setup**

	4.1) move into backend folder: `cd server`

	4.2) create a `.env` with these settings:

	```ts
	PORT=8000
	MONGO_HOST=127.0.0.1
	NODE_ENV=development
	```

	4.3) `npm i`

	4.4) Run dev server: `npm run dev`

## On-boarding

### Server Notes
1) The current server middleware is configured to automatically encapsulate arguments passed into `res.json(<YOUR_DATA>)` with: `{data:<YOUR_DATA>}`. If an error is thrown and is uncaught, it will respond to the client with `{error:<YOUR_ERROR>|<YOUR_ERROR_MESSAGE>}`

# PRODUCTION TESTING (TESTING ONLY!!!)
- WARNING: the below process copies the `.env` into the `dist/` folder which is BAD practice

1) Clone repo `git clone`

2) `cd <repo-name>`

3) `cd client`

4) `npm run build` This will produce a transpiled version of the vite react client into `dist/client/`

5) `cd ../server`

6) `npm run build` This will produce a transpiled version of the express server into `dist/server/`

7) Copy the server's `.env` and `package.json` into the `dist` folder. NOTE: WE ARE COPYING THE `.env` FILE AND THUS THIS SHOULD ONLY BE USED FOR TESTING PURPOSES!

8) `cd ../dist` To navigate to the `dist/` folder

9) `npm i` To install dependencies for the `dist/` folder

10) `node ./server/entry.js` To run the application