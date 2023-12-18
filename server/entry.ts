import mongoose from "mongoose";
import { CONFIG } from "./config/config"
import { app } from "./server"
import { ModelWorkouts } from "./validatorsmodelstypes/workouts";


(async function () {
	console.log("asd")
	try {
		// Connect to mongodb server
		console.log("STARTING!!!")
		await mongoose.connect(`mongodb://${CONFIG.MONGO_HOST}:27017/workouts`)
		console.log("CONNECTED TO MONGODB");

		// Enable mongoose vaidation
		mongoose.plugin(schema => {
			schema.pre('findOneAndUpdate', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateMany', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateOne', function () { this.setOptions({ runValidators: true }) });
		});

		// Listen
		app.listen(CONFIG.PORT, () => console.log("Listening on port " + CONFIG.PORT))
	} catch (err) {
		throw new Error("ERROR: " + err)
	}
})()