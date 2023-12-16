import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { WorkoutsContextProvider } from './pages/Shared/WorkoutContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<WorkoutsContextProvider>
				<App />
			</WorkoutsContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
