import dotenv from 'dotenv';

// Load env variable
dotenv.config();

// Export Config
export const CONFIG = {
	PORT: loadEnvironmentVariable(process.env.PORT),
	MONGO_URL: loadEnvironmentVariable(process.env.MONGO_URL)
}


// HELPER FUNCTION
function loadEnvironmentVariable<T>(environmentVariable:T){
	if (!environmentVariable)
		throw new Error("Error: environment variable is NOT defined")
	return environmentVariable
}