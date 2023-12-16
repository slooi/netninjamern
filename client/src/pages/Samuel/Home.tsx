import { useEffect, useState } from "react"
import WorkoutForm from "./WorkoutForm";
import { useWorkoutContext } from "../../hooks/useWorkoutsContext";
import { ZodSchemaWorkoutMongoose } from "../../../../server/validatorsmodelstypes/workouts";
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

	return (
		<>
			<h1>Home</h1>
			<WorkoutForm />
			{
				m_workouts.map(workout => (<h1 key={workout._id}>{workout.title} {workout.load} {workout.reps}</h1>))
			}

		</>
	)
}


export default Home