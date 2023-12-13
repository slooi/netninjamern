import express, { NextFunction, Request, Response } from "express";
import { routerWorkouts } from "./routers/workouts";
import { KnownError, createErrorHandlerMiddleware, errorHandler, errorHandlerMiddleware } from "./errorHandling/error";
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
app.use(createErrorHandlerMiddleware([KnownError, Zod.ZodError]))