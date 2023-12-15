import mongoose from "mongoose";
import z from "zod";

// Zod Schema
export const ZodSchemaWorkout = z.object({
	title: z.string(),
	reps: z.number(),
	load: z.number()
}).strict()

// .strict()
// try {
// 	const validatedData = ZodSchemaWorkout.parse({ title: "hi", reps: 1, load: 2, extraField: "ahaha" });
// 	console.log("Validation successful:");
// } catch (err) {
// 	console.error("Validation failed:");
// }



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


export const ZodSchemaMongooseTypes = z.object({
	createdAt: z.string(), // Assuming createdAt is a string (e.g., ISO date)
	updatedAt: z.string(),
	_id: z.string(),
	__v: z.number(),
});







// Model
export const ModelWorkouts = mongoose.model("workouts", SchemaWorkout)
