import express, { NextFunction, Request, Response } from "express";
import { ModelWorkouts, ZodSchemaWorkout } from "../validatorsmodelstypes/Workouts";
import { asyncNextCaller } from "../utils";

const router = express.Router()



// GET all
router.get(`/`, async (req, res) => {
	res.status(200).json(await ModelWorkouts.find())
})



// GET id
router.get(`/:id`, asyncNextCaller(async (req, res) => {
	const { id } = req.params
	console.log("req.params \t", req.params)

	console.log('await ModelWorkouts.findById(id) \t', await ModelWorkouts.findById(id))

	res.status(200).json({ msg: `GET workout: ${id}` })
}))



// POST
router.post(`/`, asyncNextCaller(async (req, res, next) => {
	const workout = await ModelWorkouts.create({ ...ZodSchemaWorkout.parse(req.body) })

	console.log("await ModelWorkouts.find() \t", await ModelWorkouts.find())

	res.status(200).json({ msg: workout })
}))



// DELETE
router.delete("/:id", asyncNextCaller(async (req, res) => {

	const { id } = req.params
	console.log("await ModelWorkouts.deleteOne(id) \t", await ModelWorkouts.deleteOne(id))
	res.status(200).json({ msg: "DELETE workout: " + id })
}))



// PATCH
router.patch("/:id", asyncNextCaller(async (req, res) => {
	const { id } = req.params

	// READ worker
	const workout = await ModelWorkouts.find(id)

	// UPDATE worker
	// workout.

	res.status(200).json({ msg: "PATCH workout: " + id })
}))



export const routerWorkouts = express.Router().use("/workouts", router)