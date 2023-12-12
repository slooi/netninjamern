import express from "express"
declare module "express" {
	interface Response {
		json: (body: DataOrError) => this;
	}
}
type DataOrError = { error: any; data?: never } | { error?: never; data: any }