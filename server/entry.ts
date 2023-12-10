import mongoose from "mongoose";
import { CONFIG } from "./config"
import { app } from "./server"


(async function (){
	try{
		// Connect to mongodb server
		await mongoose.connect(CONFIG.MONGO_URL)
		console.log("CONNECTED TO MONGODB");
		
		app.listen(CONFIG.PORT,()=>console.log("Listening on port "+CONFIG.PORT))
	}catch(err){
		throw new Error("ERROR: "+err)
	}
})()