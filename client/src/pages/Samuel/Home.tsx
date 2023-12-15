import { useEffect } from "react"

const Home = () => {

	useEffect(() => {
		fetch("/api/workouts").then(res => res.json()).then(res => console.log(res)).catch(err => { throw new Error(err) })
	}, [])

	return (
		<>
			<h1>Home</h1>
		</>
	)
}


export default Home