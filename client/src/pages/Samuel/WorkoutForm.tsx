import { FormEvent, useState } from "react"

const WorkoutForm = () => {
	const [title, setTitle] = useState<string>("")
	const [reps, setReps] = useState<string>("")
	const [load, setLoad] = useState<string>("")
	const [error, setError] = useState(null)


	const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Remember to 

		const workout = {
			title: "hi",
			load: "asd",
			reps: 1
		}

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
			if (!response.ok) {
				setError(json)
				throw new Error("ERROR response was not ok")
			}
			console.log("json", json)
		} catch (err) {
			throw new Error(`${err}`)
		}

	}

	return (
		<>
			<form className="create" onSubmit={formSubmitHandler}>
				<label>Exercise Title:</label>
				<input name="title" type="text" onChange={e => setTitle(e.target.value)} value={title} />
				<label>Reps:</label>
				<input name="reps" type="text" onChange={e => setReps(e.target.value)} value={reps} />
				<label>Load (in kg):</label>
				<input name="load" type="text" onChange={e => setLoad(e.target.value)} value={load} />
				<button>Add Workout</button>
			</form>
		</>
	)
}

export default WorkoutForm