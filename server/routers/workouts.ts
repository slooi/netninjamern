import express, { NextFunction, Request, Response } from "express";
import { ModelWorkouts, ZodSchemaWorkout } from "../validatorsmodelstypes/Workouts";
import { asyncNextCaller } from "../utils";
import mongoose from "mongoose";

const router = express.Router()



// GET all
router.get(`/`, async (req, res) => {
	return res.status(200).json(await ModelWorkouts.find().sort({createdAt:-1}))
})



// GET id
router.get(`/:id`, asyncNextCaller(async (req, res) => {
	console.log("req.params \t", req.params)

	const { id } = req.params
	if (mongoose.Types.ObjectId.isValid(id)){
		throw new Error("")
	}
	return res.status(200).json(await ModelWorkouts.findById(id))
}))



// POST
router.post(`/`, asyncNextCaller(async (req, res, next) => {
	return res.status(200).json(await ModelWorkouts.create({ ...ZodSchemaWorkout.parse(req.body) }))
}))



// DELETE
router.delete("/:id", asyncNextCaller(async (req, res) => {
	console.log("req.params \t", req.params)

	const { id } = req.params
	const workout = await ModelWorkouts.deleteOne(id)
	return res.status(200).json({"msg":"wai"})
}))



// PATCH
router.patch("/:id", asyncNextCaller(async (req, res) => {
	const { id } = req.params

	// READ worker
	const workout = await ModelWorkouts.find(id)
	return res.status(200).json({ msg: "PATCH workout: " + id })
}))



export const routerWorkouts = express.Router().use("/workouts", router)