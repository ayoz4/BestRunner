import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts, deleteWorkout } from "../../redux/actions/workoutActions";

import TableWorkout from "../TableWorkout";

function App() {
  const dispatch = useDispatch();

  const workouts = useSelector((state) => state.workouts);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        dispatch(getWorkouts());
      } catch (error) {}
    };

    fetchWorkouts();
  }, []);

  const removeWorkout = (id) => {
    dispatch(deleteWorkout(id));
  };

  return (
    <div>
      <TableWorkout data={workouts} deleteRow={removeWorkout} />
    </div>
  );
}

export default App;
