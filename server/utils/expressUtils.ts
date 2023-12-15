import { NextFunction, Request, Response } from "express"

// Wrap your async controllers with this! This automatically calls the `next` function when the 
// function argument throws an errors allowing you to have a centralized location for handling errors 
export const asyncNextCaller = <T extends (req: Request, res: Response, next: NextFunction, ...args: any) => any>(fn: T) => (
	function asyncUtilWrap(req: Request, res: Response, next: NextFunction, ...args: any) {
		const fnReturn = fn(req, res, next, ...args)
		return Promise.resolve(fnReturn).catch(next)
	}
)
