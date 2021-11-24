import axios from "axios";
import { Dispatch } from "redux";
import {
  API,
  GET_WORKOUTS_FAILURE,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
} from "../consts";
import { Workout, WorkoutActions } from "../types";

export const getWorkouts = () => async (dispatch: Dispatch<WorkoutActions>) => {
  try {
    dispatch({ type: GET_WORKOUTS_REQUEST });

    const msg = await axios.get(API + "workouts");

    return dispatch({ type: GET_WORKOUTS_SUCCESS, data: msg.data });
  } catch (error) {
    dispatch({ type: GET_WORKOUTS_FAILURE, error: error.response });
  }
};

export const deleteWorkout =
  (id: number) =>
  async (dispatch: Dispatch<WorkoutActions>): Promise<any> => {
    try {
      await axios.delete(API + `workouts/${id}`);

      return getWorkouts();
    } catch (error) {
      console.log(error.response);
    }
  };

export const createWorkout =
  (workout: Workout) => async (dispatch: Dispatch<WorkoutActions>) => {
    try {
      setTimeout(() => {}, 3000);

      await axios.post(API + "workouts", workout);

      return getWorkouts();
    } catch (error) {
      throw error.message;
    }
  };

export const editWorkout =
  (workout: Workout) => async (dispatch: Dispatch<WorkoutActions>) => {
    try {
      await axios.put(API + `workouts/${workout.id}`, workout);

      return getWorkouts();
    } catch (error) {
      console.log(error.response);
    }
  };
