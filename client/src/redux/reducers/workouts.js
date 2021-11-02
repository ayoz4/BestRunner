import { GET_WORKOUTS_REQUEST, GET_WORKOUTS_SUCCESS } from "../consts";

const workouts = (state = [], { type, data }) => {
  switch (type) {
    case GET_WORKOUTS_REQUEST:
      return state;
    case GET_WORKOUTS_SUCCESS:
      return {
        ...state,
        data,
      };
    default:
      return state;
  }
};

export default workouts;
