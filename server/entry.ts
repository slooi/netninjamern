import mongoose from "mongoose";
import { CONFIG } from "./config"
import { app } from "./server"
import { ModelWorkouts } from "./validatorsmodelstypes/Workouts";


(async function (){
	try{
		// Connect to mongodb server
		await mongoose.connect(CONFIG.MONGO_URL)
		console.log("CONNECTED TO MONGODB");

		console.log(await ModelWorkouts.create({title:"test","reps":1,"load":2}))
		

		app.listen(CONFIG.PORT,()=>console.log("Listening on port "+CONFIG.PORT))
	}catch(err){
		throw new Error("ERROR: "+err)
	}
})()