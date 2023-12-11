import express from "express";
import { routerWorkouts } from "./routers/workouts";

// Create express app
export const app = express();


// MIDDLEWARE
app.use(express.json())

app.use((req, res, next) => {
	console.log("req.path req.method:", req.path, req.method);
	console.log("req.body:",req.body)
	next();
});


// Routes
app.use("/api", routerWorkouts);
