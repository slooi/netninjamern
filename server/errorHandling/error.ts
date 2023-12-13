// class APIError {
// 	constructor(code, message) {
// 		this.code = code
// 		this.message = message
// 	}
// 	static badRequest(msg) {
// 		return new APIError(400, msg)
// 	}
// 	static internal(msg) {
// 		return new APIError(500, msg)
// 	}
// }

// function apiErrorHandler(err, req, res, next) {
// 	// in prod don't use console.log or prod, it's not async
// 	// use wintons
// 	console.error(err)


// 	if (err instanceof ApiError) {
// 		res.status(err.code).json()
// 		return;
// 	}
// 	res.status(500).json()
// }






import { NextFunction, Request, Response, } from "express";



// ####################################################
//		Uncaught Error Handling - should restart in production as now in undefined state
// ####################################################
// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
	// 1) PERFORM LOGGING
	// 2) RESTART
	console.log("!!!!!!!!!!!!! :( !!!!!!!!!!!!!")
	throw error
	// if (!errorHandler.isTrustedError(error)) {
	//   process.exit(1);
	// }
});



// ####################################################
//				Middleware Error Handling
// ####################################################


type ErrorConstructor = new (...any: any[]) => Error

export class KnownError extends Error {
	constructor(ProjectKnownErrorMsgs: ProjectKnownErrorMsgs) {
		super(ProjectKnownErrorMsgs)
	}
	returnMessage() {
		return this.message
	}
}

export const createErrorHandlerMiddleware = <T extends ErrorConstructor>(knownErrors: Array<T>) => {
	return <T extends Error>(error: T, req: Request, res: Response, next: NextFunction) => {
		// Logs
		console.log("####################### knownErrorHandler #######################")
		console.log("req.path req.method:", req.path, req.method);
		console.log("req.body:", req.body)
		console.log(error)

		// Handle all possible known errors
		for (let i = 0; i < knownErrors.length; i++) {
			const knownError = knownErrors[i]
			console.log("error instanceof knownError", error instanceof knownError)
			if (error instanceof knownError) {
				return res.json({ error: error.message })
			}
		}

		// Handle unkown error
		console.log("!!!!!!!!!!!!! unidentified middleware error :( !!!!!!!!!!!!!")
		return res.json({ error500: error.message })
	}
}