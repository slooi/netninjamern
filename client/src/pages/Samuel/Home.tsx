import { useEffect, useState } from "react"
import WorkoutForm from "./WorkoutForm";
import { useWorkoutContext } from "../../hooks/useWorkoutsContext";
import { M_Workout, ZodSchemaWorkoutMongoose } from "../../../../server/validatorsmodelstypes/workouts";
import { z } from "zod";


const Home = () => {
	// const [workouts, setWorkouts] = useState<z.infer<typeof ExtendedZodSchemaWorkoutArray>>([])
	const { m_workouts, dispatch } = useWorkoutContext()


	useEffect(() => {
		fetch("/api/workouts")
			.then(res => res.json())
			.then(res => {
				console.log("res \t", res);


				if ("data" in res) {
					console.log("res.data", res.data)
					const m_workouts = z.array(ZodSchemaWorkoutMongoose).parse(res.data)
					console.log("m_workouts \t", m_workouts);
					dispatch({ type: "SET_WORKOUTS", payload: m_workouts })
				} else {
					throw new Error("Error response did not contain data")
				}

			})
			.catch(err => { throw new Error(err) })
	}, [])

	const handleClick = async (m_workout: M_Workout) => {
		try {
			// Get data
			const response = await fetch(`/api/workouts/${m_workout._id}`, {
				method: "delete"
			})
			const json = await response.json()


			console.log("json \t", json)
			if ("data" in json) {
				console.log("DELETE json.data \t",)
				const m_workout = ZodSchemaWorkoutMongoose.parse(json.data)
				dispatch({ type: "DELETE_WORKOUT", payload: m_workout })
			} else {
				throw new Error("ERROR response error")
			}
		} catch (err) {
			throw new Error(`${err}`)
		}
	}

	return (
		<>
			<h1>Home</h1>
			<WorkoutForm />
			{
				m_workouts.map(m_workout => (

					<div key={m_workout._id}>
						<h3>
							{m_workout.title}
						</h3>
						<div style={{ backgroundColor: "pink" }}>
							<ul>
								<li>load:{m_workout.load}</li>
								<li>reps:{m_workout.reps}</li>
								<li><button onClick={() => handleClick(m_workout)}>Delete workout</button></li>
							</ul>
						</div>
					</div>
				))
			}

		</>
	)
}


export default Home