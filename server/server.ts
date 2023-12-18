import express, { NextFunction, Request, Response } from "express";
import { routerWorkouts } from "./routers/workouts";
import { KnownError, errorHandlerMiddleware } from "./errorHandling/error";
import Zod from "zod";
import path from "path"
import { CONFIG } from "./config/config";

// Create express app
export const app = express();


// #######################################################################
// 							MIDDLEWARE
// #######################################################################


// wrap <YOUR_DATA> with {data:<YOUR_DATA>} when ever res.json() is called. Only do it if it is not an error
const wrapResponseData = (req: Request, res: Response, next: NextFunction) => {
	const originalJson = res.json.bind(res);

	// Update the res.json assignment
	res.json = function (this: Response<any, Record<string, any>>, data: any): Response<any, Record<string, any>> {
		if (!("error" in data)) {
			data = { data: data };
		}
		return originalJson.call(this, data);
	};

	next();
};
app.use(wrapResponseData);

// Parse json
app.use(express.json())

// Middleware for visibility
app.use((req, res, next) => {
	console.log("req.path req.method:", req.path, req.method);
	console.log("req.body:", req.body)
	next();
});




// #######################################################################
// 							APPLICATION SPECIFIC CODE
// #######################################################################
if (CONFIG.NODE_ENV === "production") {
	console.log("### code is running in PRODUCTION mode ###")

	const clientPath = path.join(__dirname, "..", "client")
	app.use(express.static(clientPath));
	app.get("/", (req, res) => {
		res.sendFile(path.join(clientPath, "index.html"))
	})
} else {
	console.log("### code is running in DEVELOPMENT mode ###")
	app.get("/", (req, res) => {
		res.send("Server is in DEVELOPMENT mode. Set `NODE_ENV=production` to run in production")
	})
}


// Routes
app.use("/api", routerWorkouts);




// #######################################################################
// 							END ROUTES
// #######################################################################
// Handle routes that I haven't implemented. THIS MUST BE AFTER ALL OTHER ROUTES/MIDDLEWARE (b4 error handler though)
app.use((req, res, next) => {
	res.status(404).send({ error: "Not found. Wrong route, nothing's here :>" })
	next()
})

// THIS MUST BE BELOW ALL OTHER MIDDLEWARE INCLUDING MIDDLEWARE ROUTES (IDK ABOUT just NORMAL ROUTES THOUGH)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	errorHandlerMiddleware(error, req, res, next, [
		KnownError,
		[Zod.ZodError, () => res.send({ error: error })]
	],
		() => res.status(400).json({ error: error.message }),
		() => res.status(500).json({ error: error.message })
	)
})