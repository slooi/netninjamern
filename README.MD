

# DEVELOPMENT

## On-boarding

### Server Notes
1) The current server middleware is automatically configured to encapsulate arguments passed into `res.json(YOUR_ARGS)` with: `{data:<YOUR_DATA>}`. If an error is thrown and is uncaught, it will respond to the client with `{error:<YOUR_ERROR>|<YOUR_ERROR_MESSAGE>}`

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