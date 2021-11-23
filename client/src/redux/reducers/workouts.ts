import {
  GET_WORKOUTS_FAILURE,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
} from "../consts";
import { WorkoutActions, WorkoutState } from "../types";

const workoutDefaultState: WorkoutState = {
  isFetching: false,
  isFetched: false,
  data: [],
  error: null,
};

const workouts = (state = workoutDefaultState, action: WorkoutActions) => {
  switch (action.type) {
    case GET_WORKOUTS_REQUEST:
      return {
        ...workoutDefaultState,
        isFetching: true,
      };
    case GET_WORKOUTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    case GET_WORKOUTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default workouts;
