import { WorkoutsContext } from "../pages/Shared/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
	/* NOTE YOU MUST PLACE THIS WITHIN THE WORKOUTSCONTEXT.PROVIDER! */
	const workoutsContext = useContext(WorkoutsContext)

	if (!workoutsContext) throw new Error("useWorkoutContext must be used inside a WorkoutsContext.Provider")

	return workoutsContext
}