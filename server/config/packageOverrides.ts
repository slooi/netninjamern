// ####################################################
//		Ensure that all json responses are constrained to 3 types
// ####################################################
import express from "express"

declare module "express" {
	interface Response {
		json: (body: DataOrError) => this;
	}
}
type DataOrError = { data: any; error?: never; error500?: never; } | { data?: never; error: any; error500?: never; } | { data?: never; error?: never; error500?: any; }
