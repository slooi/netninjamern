# Mistakes/Learnings
1) Remember to put server into server folder
2) create a config file for env vars
3) remember that you need tsconfig.json or else you won't get that nice type safety
4) REST endpoints
	1) GET	<= NO ID
	2) GET /id
	3) POST					<= NO ID
	4) Delete /id
	5) Patch /id
5) Need to use PURAL for file names too for consistency
6) Use `127.0.0.1` instead of `localhost`. eg: mongodb://127.0.0.1:27017/workouts would work when `localhost` doesn't work on my pc
7) Add CENTRALIZED MIDDLEWARE. It must come AFTER all your .use() methods! Maybe even after .get/.post/.patch/etc methods too!
```
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	...
}
```
8) Although i believe `process.on('unhandledRejection',...` can't be used by me for anything, I can use `process.on('uncaughtException',...` to log errors, do notifications and restarts when app fails in prod
9) Remember to use dependency injection to separate library logic from application logic in error handler!
10) UseTurn on mongoose validation on various method!
```
		// Enable mongoose vaidation
		mongoose.plugin(schema => {
			schema.pre('findOneAndUpdate', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateMany', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateOne', function () { this.setOptions({ runValidators: true }) });
		});
```
11) Use `strict:true` or `strict:"throw"` when defining mongoose schema so users can't add more fields on update
```
const SchemaWorkout = new mongoose.Schema<Workout>({
	title: {
		type: String,
		required: true
	},
	reps: {
		type: Number,
		required: true
	},
	load: {
		type: Number,
		required: true
	}
}, { timestamps: true, strict: "throw" })
```
12) When using vite add `host: "0.0.0.0"` and `server.proxy`
```
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		proxy: { "/api": "http://127.0.0.1:8000" }
	}
})
```



# Remember
1) mongoose uses PURAL models `mongoose.model("workouts",SchemaWorkout)`

# QUESTIONS
1 - is it possible to have packages locate din the root of monorepo?

# Improvements for future projects
1 - Mongoose is kinda annoying to use. It doesn't have typesafety so you can run into runtime errors. Like I accidentally spelt `require` instead of `required` and mongodb did NOT throw any errors... I should maybe use typegoose or prisma as they work with mongodb. `Prisma` seems like the best choice as I can alsouse it with sql and it's more popular in general.
However, I should probably use `slonik` in the future and a `sql` database like `PostgreSQL` as I am always using a schema for my current use cases. 
2 - Standardize error handling somehow. Look more into express 5. Look into custom linter to throw errors when receive async without `asyncErrorHandler` when inside of `app.get/post/patch/delete/etc`
3 - Standardize json response messages. {error:...} or {data:...}
4 - Find out why `express-async-errors` wasn't working for just this project

# STEPS (Remember to test while doing the below)
1 - Create server repo
2 - Install packages & setup tsconfig.json
3 - Create middleware route. log `path` and `method` <= test
4 - Create config and separate server and entry
5 - Define routes (GET all, GET id, POST, DELETE ID, PATCH ID)
6 - Add database
7 - Zod Schemas
8 - Error handling
9 - Test error handling and database work correctly!
10 - Add vite into `client/` folder
11 - Edit vite config so proxy points to your 
```
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		proxy: { "/api": "http://127.0.0.1:8000" }
	}
})
```