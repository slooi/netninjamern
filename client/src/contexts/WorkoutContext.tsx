import { Dispatch, createContext, useReducer } from "react"
import { ReactNode } from 'react';

import { M_Workout } from "../../../server/validatorsmodelstypes/workouts"

// ##################################### SETUP ##############################

// REDUCER's state
interface M_WorkoutsState {
	m_workouts: M_Workout[];
}

// REDUCER's actions
interface M_SetWorkoutsAction {
	type: "SET_WORKOUTS";
	payload: M_Workout[];
}
interface M_CreateWorkoutsAction {
	type: "CREATE_WORKOUT";
	payload: M_Workout;
}
interface M_DeleteWorkoutsAction {
	type: "DELETE_WORKOUT";
	payload: M_Workout;
}
type M_WorkoutActions = M_SetWorkoutsAction | M_CreateWorkoutsAction | M_DeleteWorkoutsAction;

// REDUCER
const workoutsReducer = (state: M_WorkoutsState, action: M_WorkoutActions) => {
	switch (action.type) {
		case "SET_WORKOUTS":
			return {
				m_workouts: action.payload
			}
		case "CREATE_WORKOUT":
			return {
				m_workouts: [action.payload, ...state.m_workouts]
			}
		case "DELETE_WORKOUT":
			return {
				m_workouts: state.m_workouts.filter(m_workout => m_workout._id !== action.payload._id)
			}
		default:
			throw new Error("ERROR that action type on workoutsReducer does NOT exist!")
	}
}

// Create the context
export const WorkoutsContext = createContext<{ m_workouts: M_Workout[]; dispatch: Dispatch<M_WorkoutActions> } | null>(null);



// ##################################### MAIN ##############################



export const WorkoutsContextProvider = ({ children }: { children: ReactNode }) => {
	// could use useState or reducers
	const [state, dispatch] = useReducer(workoutsReducer, {
		m_workouts: []
	})

	return (
		<WorkoutsContext.Provider value={{ m_workouts: state.m_workouts, dispatch }}>
			{children}
		</WorkoutsContext.Provider>
	)
}