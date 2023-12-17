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
```ts
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	...
}
```
8) Although i believe `process.on('unhandledRejection',...` can't be used by me for anything, I can use `process.on('uncaughtException',...` to log errors, do notifications and restarts when app fails in prod
9) Remember to use dependency injection to separate library logic from application logic in error handler!
10) Use mongoose validation on various method!
```ts
		// Enable mongoose vaidation
		mongoose.plugin(schema => {
			schema.pre('findOneAndUpdate', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateMany', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateOne', function () { this.setOptions({ runValidators: true }) });
		});
```
11) Use `strict:true` or `strict:"throw"` when defining mongoose schema so users can't add more fields on update
```ts
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
```ts
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		proxy: { "/api": "http://127.0.0.1:8000" }
	}
})
```
13) The transpiled server still needs `node_modules/`. Thus `node_modules/` must be defined in the same directory or a in a parent directory. Otherwise I'll have to copy the `package.json` as well as the `.env` file into the `dist/` folder every single time so `dist/server/entry.js` can run......
14) If you separate your code like `<root>/client` & `<root>/server` each with their package.json it means won't have intellisense to add the types which is quite annoying when you have to manually routes to import types
```ts
import {Workout} from "../../../../server/validatorsmodelstypes/workouts"

const Home = () => {
	const [workouts, setWorkouts] = useState<Workout>([])
```
15) When using zod, turn use `.strict()` so it throws errors if the user specifies more fields than intended
```ts
export const ZodSchemaWorkout = z.object({
	title: z.string(),
	reps: z.number(),
	load: z.number()
}).strict()
```
16) Zod and mongoose differences in parsing:
	1) mongoose will automatically parse a `"1"` into a `1`
	2) Zod will NOT automatically parse a `"1"` into a `1`. Instead an error will be thrown!
17) Server should respond with http status code of `500` or `400` during errors!
18) This is how you popular and send form data in react
```ts
	const [title, setTitle] = useState<string>("")
	const [reps, setReps] = useState<string>("")
	const [load, setLoad] = useState<string>("")
	const [error, setError] = useState<string>("")


	const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Remember to 

		const workout = {
			title: title,
			reps: reps
			load: load,
		}
```
19) SOLVED REACT NOT RELOAD/REFRESH BUG! The ORDER of destructing the array matters! You need to put the NEW VARIABLE in BEFORE the old state. This is the correct solution:
```ts
// REDUCER
const workoutsReducer = (state: M_WorkoutsState, action: M_WorkoutActions) => {
	switch (action.type) {
		case "SET_WORKOUTS":
			return {
				m_workouts: action.payload
			}
		case "CREATE_WORKOUT":
			return {
				m_workouts: [action.payload, ...state.m_workouts]
			}
		default:
			return state
	}
}
```
20) When using React you have to `RESPONSE.json()` the `POST` item or the `DELETED` item back to the client. This is because the client needs its to update it's local state. Alternatively you can just make react do another fetch of ALL your data but that's not efficient. For delete you need you need at least the `_id` so you can filter the existing items 
21) Do I need to pass in my `dispatch` into the `useEffect`'s dependency array?
22) Save the MONGO_HOST not MONGO_URL in the `.env` file 

# Remember
1) mongoose uses PURAL models `mongoose.model("workouts",SchemaWorkout)`

# QUESTIONS
1 - is it possible to have packages locate din the root of monorepo?

# Improvements for future projects
1 - Mongoose is kinda annoying to use. It doesn't have typesafety so you can run into runtime errors. Like I accidentally spelt `require` instead of `required` and mongodb did NOT throw any errors... I should maybe use typegoose or prisma as they work with mongodb. `Prisma` seems like the best choice as I can alsouse it with sql and it's more popular in general.
However, I should probably use `slonik` in the future and a `sql` database like `PostgreSQL` as I am always using a schema for my current use cases. 
2 - Standardize error handling somehow. Look more into express 5. Look into custom linter to throw errors when receive async without `asyncErrorHandler` when inside of `app.get/post/patch/delete/etc`
3 - Standardize json response messages. {error:...} or {data:...}
4 - Find out why `express-async-errors` wasn't working for just this 
5) Improve config code to reduce redundancy. I don't want to specify the variables both in `.env` AND in `config.ts` as it's error prone and tedious
```
export const CONFIG = {
	PORT: loadEnvironmentVariable(process.env.PORT),
	MONGO_HOST: loadEnvironmentVariable(process.env.MONGO_HOST)
}
```
6) Allow easy BUILD and testing of PROD version. => This means having a `src/` and `dist/` as well as the `node_modules/` in root of project. Note you will have to have to make a new custom `tsconfig.json` for the server as the client already has `jsconfig.json` due to vite. Will have to change vite's `public/` folder to be located like so `dist/public`. Ultimately causing dist to look like: `dist/public` + `dist/client` + `dist/server/`
7) I need a way of providing a contract or something from the server to the client. Such that the client KNOWS that they must send data in a certain schema or else they'll get an error and I'll get intellisense errors. does trpc help with this?
8) Need to find a better way other than using `m_*` for the mongoose versions of the types. Like the below code is kinda messy and confusing as I'm sometimes using `m_*` and sometimes I'm just using `*Mongoose`
```ts
const m_workout = ZodSchemaWorkoutMongoose.parse(json.data)
```




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