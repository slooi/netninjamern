import { FormEvent, useEffect, useState } from "react"
import { ZodSchemaWorkout } from "../../../../server/validatorsmodelstypes/workouts"
import { ZodSchemaErrorResponse } from "../../../../server/validatorsmodelstypes/express"
import { z } from "zod"

const WorkoutForm = () => {
	const [title, setTitle] = useState<string>("")
	const [reps, setReps] = useState<string>("")
	const [load, setLoad] = useState<string>("")
	const [error, setError] = useState<string>("")


	const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Remember to 

		const workout = { title, load, reps }

		try {

			const response = await fetch("/api/workouts/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(workout)
			})
			const json = await response.json()

			console.log(response.ok)
			console.log("json", json)

			if (!response.ok) {
				const jsonError = ZodSchemaErrorResponse.parse(json)
				setError(jsonError.error)
			} else {
				setTitle("")
				setLoad("")
				setReps("")
				setError("")
			}
		} catch (err) {
			throw new Error(`${err}`)
		}

	}

	return (
		<>
			<h3>Error: {error}</h3>
			<form className="create" onSubmit={formSubmitHandler}>
				<label>Exercise Title:</label>
				<input name="title" type="text" onChange={e => setTitle(e.target.value)} value={title} />
				<label>Reps:</label>
				<input name="reps" type="number" onChange={e => setReps(e.target.value)} value={reps} />
				<label>Load (in kg):</label>
				<input name="load" type="number" onChange={e => setLoad(e.target.value)} value={load} />
				<button>Add Workout</button>
			</form>
		</>
	)
}

export default WorkoutForm