import { useEffect, useState } from "react"

const Home = () => {
	const [workouts, setWorkouts] = useState([])

	useEffect(() => {
		fetch("/api/workouts")
			.then(res => res.json())
			.then(res => {
				console.log(res);

				if ("data" in res) {
					setWorkouts(res.data)
				} else {
					throw new Error("Error response did not contain data")
				}

			})
			.catch(err => { throw new Error(err) })
	}, [])

	return (
		<>
			<h1>Home</h1>


		</>
	)
}


export default Home