import mongoose from "mongoose";
import z from "zod";

// Zod Schema
export const ZodSchemaWorkout = z.object({
	title: z.string(),
	reps: z.number(),
	load: z.number()
})

// Type
export type Workout = z.infer<typeof ZodSchemaWorkout>

// Mongoose Schema
const SchemaWorkout = new mongoose.Schema<Workout>({
	title: {
		type: String,
		required: true
	},
	reps: {
		type: Number,
		required: true
	},
	load: {
		type: Number,
		required: true
	}
}, { timestamps: true, strict: "throw" })

// Model
export const ModelWorkouts = mongoose.model("workouts", SchemaWorkout)