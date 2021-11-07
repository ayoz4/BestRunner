import axios from "axios";
import {
  API,
  GET_WORKOUTS_FAILURE,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
} from "../consts";

export const getWorkouts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WORKOUTS_REQUEST });

    const msg = await axios.get(API + "workouts");

    return dispatch({ type: GET_WORKOUTS_SUCCESS, data: msg.data });
  } catch (error) {
    dispatch({ type: GET_WORKOUTS_FAILURE, data: error.response });
  }
};

export const deleteWorkout = (id) => async (dispatch) => {
  try {
    await axios.delete(API + `workouts/${id}`);

    return dispatch(getWorkouts());
  } catch (error) {
    console.log(error.response);
  }
};

export const createWorkout = (workout) => async (dispatch) => {
  try {
    setTimeout(() => {}, 3000);

    await axios.post(API + "workouts", workout);

    return dispatch(getWorkouts());
  } catch (error) {
    throw error.message;
  }
};

export const editWorkout = (workout) => async (dispatch) => {
  try {
    await axios.put(API + `workouts/${workout.id}`, workout);

    return dispatch(getWorkouts());
  } catch (error) {
    console.log(error.response);
  }
};
