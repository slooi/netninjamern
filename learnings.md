# Mistakes
1) Remember to put server into server folder
2) create a config file for env vars
3) remember that you need tsconfig.json or else you won't get that nice type safety
4) REST endpoints
	1) GET	<= NO ID
	2) GET /id
	3) POST					<= NO ID
	4) Delete /id
	5) Patch /id

# Remember
1) mongoose uses PURAL models `mongoose.model("workouts",SchemaWorkout)`

# QUESTIONS
1 - is it possible to have packages locate din the root of monorepo?



# STEPS (Remember to test while doing the below)
1 - Create server repo
2 - Install packages
3 - Create middleware route. log `path` and `method` <= test
4 - Create config and separate server and entry
5 - Define routes