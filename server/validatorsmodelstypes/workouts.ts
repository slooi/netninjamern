import mongoose from "mongoose";
import z from "zod";

//#################################################################################################
//							ZOD
//#################################################################################################
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

//#################################################################################################
//							TYPES
//#################################################################################################
// Type
export type Workout = z.infer<typeof ZodSchemaWorkout>


//#################################################################################################
//							MONGOOSE
//#################################################################################################
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





//#####################################################################################################
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//									INFERRED SECTION STARTS 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//#####################################################################################################

//#################################################################################################
//								ZOD INFERRED
//#################################################################################################

const ZodAdditionalMongooseTypes = z.object({
	createdAt: z.string(), // Assuming createdAt is a string (e.g., ISO date)
	updatedAt: z.string(),
	_id: z.string(),
	__v: z.number(),
});


export const ZodSchemaWorkoutMongoose = ZodSchemaWorkout.merge(ZodAdditionalMongooseTypes)

// try {
// 	ZodAdditionalMongooseTypes.parse({
// 		"title": "ttt",
// 		"reps": 333,
// 		"load": 111,
// 		"_id": "657c8450e564ff7a0d30c7b8",
// 		"createdAt": "2023-12-15T16:52:32.466Z",
// 		"updatedAt": "2023-12-15T16:52:32.466Z",
// 		"__v": 0
// 	})
// 	console.log("no error :D!")
// } catch (err) {
// 	console.log("error :D!")
// }
//#################################################################################################
//							TYPES INFERRED
//#################################################################################################

export type M_Workout = z.infer<typeof ZodSchemaWorkoutMongoose>

//#################################################################################################
//							EXPORTS
//#################################################################################################
// Model
export const ModelWorkouts = mongoose.model("workouts", SchemaWorkout)