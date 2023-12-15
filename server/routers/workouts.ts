import express, { NextFunction, Request, Response } from "express";
import { ModelWorkouts, ZodSchemaWorkout } from "../validatorsmodelstypes/workouts";
import { asyncNextCaller } from "../utils/expressUtils";
import mongoose from "mongoose";
import { KnownError } from "../errorHandling/error";


const router = express.Router()



// GET all
router.get(`/`, asyncNextCaller(async (req, res) => {
	return res.status(200).json(await ModelWorkouts.find().sort({ createdAt: -1 }))
}))



// GET id
router.get(`/:id`, asyncNextCaller(async (req, res) => {
	console.log("req.params \t", req.params)

	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) throw new KnownError("InvalidMongooseIdType")

	const workout = await ModelWorkouts.findById(id)
	if (!workout) throw new KnownError("Workout does not exist!")

	return res.status(200).json()
}))



// POST
router.post(`/`, asyncNextCaller(async (req, res, next) => {
	return res.status(200).json(await ModelWorkouts.create({ ...req.body }))
}))



// DELETE
router.delete("/:id", asyncNextCaller(async (req, res) => {
	const { id } = req.params
	const workout = await ModelWorkouts.findByIdAndDelete(id)

	if (workout) {
		return res.status(200).json(workout)
	} else {
		throw new KnownError("No workout with that id exists")
	}
}))



// PATCH
router.patch("/:id", asyncNextCaller(async (req, res) => {
	console.log(req.body)
	const { id } = req.params

	// READ worker
	const workout = await ModelWorkouts.findOneAndUpdate({ _id: id }, { ...req.body })
	if (workout) {
		return res.status(200).json(workout)
	} else {
		throw new KnownError("No workout with that id exists")
	}
}))



export const routerWorkouts = express.Router().use("/workouts", router)