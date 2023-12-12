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



export class ErrorInvalidMongooseIDType extends Error{
	constructor(){
		super("Invalid mongoose id!")
	}
}