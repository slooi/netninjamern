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

# Remember
1) mongoose uses PURAL models `mongoose.model("workouts",SchemaWorkout)`

# QUESTIONS
1 - is it possible to have packages locate din the root of monorepo?

# Improvements for future projects
1 - Mongoose is kinda annoying to use. It doesn't have typesafety so you can run into runtime errors. Like I accidentally spelt `require` instead of `required` and mongodb did NOT throw any errors... I should maybe use typegoose or prisma as they work with mongodb. `Prisma` seems like the best choice as I can alsouse it with sql and it's more popular in general.
However, I should probably use `slonik` in the future and a `sql` database like `PostgreSQL` as I am always using a schema for my current use cases. 

# STEPS (Remember to test while doing the below)
1 - Create server repo
2 - Install packages
3 - Create middleware route. log `path` and `method` <= test
4 - Create config and separate server and entry
5 - Define routes