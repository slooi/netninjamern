import dotenv from 'dotenv';

// Load env variable
dotenv.config();

// Export Config
export const CONFIG = {
	PORT: loadEnvironmentVariable(process.env.PORT),
	MONGO_HOST: loadEnvironmentVariable(process.env.MONGO_HOST),
	NODE_ENV: loadEnvironmentVariable(process.env.NODE_ENV)
}


// HELPER FUNCTION
function loadEnvironmentVariable<T>(environmentVariable: T) {
	if (!environmentVariable)
		throw new Error("Error: environment variable is NOT defined")
	return environmentVariable
}