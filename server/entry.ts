import mongoose from "mongoose";
import { CONFIG } from "./config/config"
import { app } from "./server"
import { ModelWorkouts } from "./validatorsmodelstypes/workouts";


(async function () {
	try {
		// Connect to mongodb server
		await mongoose.connect(CONFIG.MONGO_URL)
		console.log("CONNECTED TO MONGODB");

		// Enable mongoose vaidation
		mongoose.plugin(schema => {
			schema.pre('findOneAndUpdate', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateMany', function () { this.setOptions({ runValidators: true }) });
			schema.pre('updateOne', function () { this.setOptions({ runValidators: true }) });
		});


		// const userSchema = new mongoose.Schema({
		// 	name: { type: String, required: true },
		// 	age: { type: Number, min: 13, max: 90 }
		// });
		// const User = mongoose.model('User', userSchema);
		// const hafez = new User({ name: 'Hafez', age: 24 });
		// // hafez.save()
		// async function run() {
		// 	try {
		// 		const a = await User.findByIdAndUpdate("6579d9d8212c13cec7f0907c", { age: 10 });
		// 		console.log("a", a)

		// 	} catch {
		// 		console.log("err happened")
		// 	}
		// }
		// await run()


		app.listen(CONFIG.PORT, () => console.log("Listening on port " + CONFIG.PORT))
	} catch (err) {
		throw new Error("ERROR: " + err)
	}
})()