import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
	return (
		<>
			<Navbar />
			{/* <img src={viteLogo} className="logo" alt="Vite logo" />
		<img src={reactLogo} className="logo react" alt="React logo" /> */}
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
}


export default App
