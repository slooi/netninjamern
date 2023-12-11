import express, { NextFunction, Request, Response } from "express";
import { ModelWorkouts, ZodSchemaWorkout } from "../validatorsmodelstypes/Workouts";
import { z } from "zod";

const router = express.Router()

// GET all
router.get(`/`, (req, res) => {
	res.status(200).json({ msg: "GET all workouts" })
})

// GET id
router.get(`/:id`, (req, res) => {
	const { id } = req.params
	res.status(200).json({ msg: `GET workout: ${id}` })
})


function createValidateMiddleware<T extends z.ZodRawShape>(zodSchema: z.ZodObject<T>) {

	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// Validate the request body against Zod schema
			zodSchema.parse(req.body);
			next();
		} catch (error) {
			res.status(400).json({ error: error });
		}
	};
}

// POST
router.post(`/`, createValidateMiddleware(ZodSchemaWorkout), async (req, res) => {
	try {
		console.log(req.body)
		const workout = await ModelWorkouts.create({
			load: 1000,
			reps: 1000,
			title: "naiwa"
		})
		console.log("wah")
		console.log(await ModelWorkouts.find())
		console.log(1231231231231231231312)
		res.status(200).json({ msg: workout })
	} catch (err) {
		console.log(1231231231231231231312)
		res.status(400).json({ msg: "Error creating workouts" })
	}
})

// DELETE
router.delete("/:id", (req, res) => {
	const { id } = req.params
	res.status(200).json({ msg: "DELETE workout: " + id })
})

// PATCH
router.patch("/:id", (req, res) => {
	const { id } = req.params
	res.status(200).json({ msg: "PATCH workout: " + id })
})



export const routerWorkouts = express.Router().use("/workouts", router)