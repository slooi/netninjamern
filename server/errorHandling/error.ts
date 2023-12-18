import { NextFunction, Request, Response, } from "express";



// ####################################################
//		Uncaught Error Handling - should restart in production as now in undefined state
// ####################################################
// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
	// 1) PERFORM LOGGING
	// 2) RESTART
	console.log("!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!")
	console.log("!!!!!!!!!!!!! note, if the error was thrown within an async function, then you probably forgot to wrap it with `asyncNextCaller` function !!!!!!!!!!!!!")
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
	constructor(message: string | undefined) {
		super(message)
	}
	returnMessage() {
		return this.message
	}
}

// | [ErrorConstructor, (error2: Error) => any]

export const errorHandlerMiddleware = <T extends Error>(error: T, req: Request, res: Response, next: NextFunction, errorHandlers: Array<ErrorConstructor | [ErrorConstructor, () => any]>, defaultErrorHandler: (...any: any) => any, unspecifiedErrorHandler: (...any: any) => any) => {
	// Logs
	console.log("####################### MIDDLEWARE ERROR HANDLER #######################")
	console.log("req.path req.method:", req.path, req.method);
	console.log("req.body:", req.body)
	console.log(error)

	// Handle all possible known errors
	for (let i = 0; i < errorHandlers.length; i++) {
		const errorHandler = errorHandlers[i]

		if (Array.isArray(errorHandler)) {
			// User has defined custom handler for this specific error type

			const errorToListenFor = errorHandler[0]
			const handler = errorHandler[1]
			if (error instanceof errorToListenFor) {
				console.log("####################### CUSTOM error handler used #######################")
				return handler()
			}
		} else {
			// User is using default handler for this error type

			const errorToListenFor = errorHandler
			if (error instanceof errorToListenFor) {
				console.log("####################### DEFAULT error handler used #######################")
				return defaultErrorHandler()
			}
		}
	}

	// Handle unknown error
	console.log("!!!!!!!!!!!!! UNIDENTIFIED middleware error !!!!!!!!!!!!!")
	return unspecifiedErrorHandler()
}