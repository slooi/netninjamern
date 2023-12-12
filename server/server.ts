import express, { NextFunction, Request, Response } from "express";
import { routerWorkouts } from "./routers/workouts";

// Create express app
export const app = express();


// MIDDLEWARE
app.use(express.json())

app.use((req, res, next) => {
	console.log("req.path req.method:", req.path, req.method);
	console.log("req.body:", req.body)
	next();
});

// Routes
app.use("/api", routerWorkouts);

// type DataOrError = { error: any; data?: never } | { error?: never; data: any }
// interface DataOrErrorResponse extends Response {
// 	json: (body: DataOrError) => this
// }

// interface Express


// THIS MUST BE BELOW ALL OTHER MIDDLEWARE INCLUDING MIDDLEWARE ROUTES (IDK ABOUT just NORMAL ROUTES THOUGH)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	console.log("####################### ERROR #######################")
	console.log("req.path req.method:", req.path, req.method);
	console.log("req.body:", req.body)
	console.log(error)
	res.json({ error: error })
})
