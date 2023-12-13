import express, { NextFunction, Request, Response } from "express";
import { routerWorkouts } from "./routers/workouts";
import { KnownError, errorHandlerMiddleware } from "./errorHandling/error";
import Zod from "zod";

// Create express app
export const app = express();


// #######################################################################
// 							MIDDLEWARE
// #######################################################################
app.use(express.json())



app.use((req, res, next) => {
	console.log("req.path req.method:", req.path, req.method);
	console.log("req.body:", req.body)
	next();
});



// Routes
app.use("/api", routerWorkouts);






// #######################################################################
// 							END ROUTES
// #######################################################################
// Handle routes that I haven't implemented
app.use((req, res, next) => {
	res.send({ error: "Wrong route, nothing's here :>" })
})

// THIS MUST BE BELOW ALL OTHER MIDDLEWARE INCLUDING MIDDLEWARE ROUTES (IDK ABOUT just NORMAL ROUTES THOUGH)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	errorHandlerMiddleware(error, req, res, next, [
		KnownError,
		[Zod.ZodError, () => res.send({ error: error })]
	],
		() => res.json({ error: error.message }),
		() => res.json({ error500: error.message })
	)
})