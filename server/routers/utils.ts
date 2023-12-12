import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function createValidateMiddleware<T extends z.ZodRawShape>(zodSchema: z.ZodObject<T>) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// Validate the request body against Zod schema
			zodSchema.parse(req.body);
			next();
		} catch (error) {
			res.status(400).json({ error: error });
		}
	};
}