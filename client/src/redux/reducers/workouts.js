import {
  GET_WORKOUTS_FAILURE,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
} from "../consts";

const workoutDefaultState = {
  isFetching: false,
  isFetched: false,
  data: [],
  error: null,
};

const workouts = (state = workoutDefaultState, { type, data }) => {
  switch (type) {
    case GET_WORKOUTS_REQUEST:
      return {
        ...workoutDefaultState,
        isFetching: true,
      };
    case GET_WORKOUTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: data,
      };
    case GET_WORKOUTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: data
      }  
    default:
      return state;
  }
};

export default workouts;
