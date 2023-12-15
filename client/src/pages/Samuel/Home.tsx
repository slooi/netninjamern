import { useEffect, useState } from "react"
import { ZodSchemaMongooseTypes, Workout, ZodSchemaWorkout } from "../../../../server/validatorsmodelstypes/workouts"
import { z } from "zod";


const ExtendedZodSchemaWorkout = ZodSchemaWorkout.merge(ZodSchemaMongooseTypes);
const ExtendedZodSchemaWorkoutArray = z.array(ExtendedZodSchemaWorkout);

const Home = () => {
	const [workouts, setWorkouts] = useState<z.infer<typeof ExtendedZodSchemaWorkoutArray>>([])

	useEffect(() => {
		fetch("/api/workouts")
			.then(res => res.json())
			.then(res => {
				console.log(res);


				if ("data" in res) {
					const workout = ExtendedZodSchemaWorkoutArray.parse(res.data)
					setWorkouts(workout)
				} else {
					throw new Error("Error response did not contain data")
				}

			})
			.catch(err => { throw new Error(err) })
	}, [])

	return (
		<>
			<h1>Home</h1>
			{
				workouts.map(workout => (<h1 key={workout._id}>{workout.title} {workout.load} {workout.reps}</h1>))
			}

		</>
	)
}


export default Home