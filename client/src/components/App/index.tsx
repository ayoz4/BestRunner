import axios from "axios";
import React from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { API } from "../../redux/consts";
import { Workout } from "../../redux/types";

import TableWorkout from "../TableWorkout";
import { AppWrapper } from "./styles";

const fetchWorkouts = async () => {
  return await (
    await axios.get(API + "workouts")
  ).data;
};

function App() {
  const { isLoading, data, error } = useQuery<Workout[]>(
    "workouts",
    fetchWorkouts
  );

  return (
    <AppWrapper>
      <TableWorkout data={data} isLoading={isLoading} />
    </AppWrapper>
  );
}

export default App;
