import { z } from "zod";

export const ZodSchemaErrorResponse = z.object({
	error: z.string()
})

