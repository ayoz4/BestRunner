import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts, deleteWorkout } from "../../redux/actions/workoutActions";
import { RootStore } from "../../redux/store";
import { WorkoutState } from "../../redux/types";

import TableWorkout from "../TableWorkout";
import { AppWrapper } from "./styles";

function App() {
  const dispatch = useDispatch();

  const workouts = useSelector<RootStore, WorkoutState>(
    (state) => state.workouts
  );

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        dispatch(getWorkouts());
      } catch (error) {}
    };

    fetchWorkouts();
  }, []);

  const removeWorkout = (id: number) => {
    dispatch(deleteWorkout(id));
  };

  return (
    <AppWrapper>
      <TableWorkout data={workouts} deleteRow={removeWorkout} />
    </AppWrapper>
  );
}

export default App;
