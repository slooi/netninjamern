import mongoose from "mongoose";
import z from "zod";

// Zod Schema
export const ZodSchemaWorkout= z.object({
	title:z.string(),
	reps:z.number(),
	load:z.number()
})

// Type
export type Workout = z.infer<typeof ZodSchemaWorkout>

// Mongoose Schema
const SchemaWorkout = new mongoose.Schema<Workout>({
	title: {
		type: String,
		require: true
	},
	reps: {
		type: Number,
		require: true
	},
	load: {
		type: Number,
		require: true
	}
})

// Model
mongoose.model("workouts",SchemaWorkout)