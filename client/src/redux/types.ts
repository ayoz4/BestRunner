import { AxiosResponse } from "axios";
import {
  GET_WORKOUTS_FAILURE,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
} from "./consts";

export interface Workout {
  comment: string;
  date: string;
  distance: number;
  id?: string;
  type: string;
  //TODO: Добавить дополнительные типы
}

export interface WorkoutState {
  isFetching: boolean;
  isFetched: boolean;
  data: Workout[];
  error: any;
}

export interface IWorkoutRequest {
  type: typeof GET_WORKOUTS_REQUEST;
}

export interface IWorkoutSuccess {
  type: typeof GET_WORKOUTS_SUCCESS;
  data: any;
}

export interface IWorkoutFailure {
  type: typeof GET_WORKOUTS_FAILURE;
  error: any;
}

export type WorkoutActions =
  | IWorkoutRequest
  | IWorkoutSuccess
  | IWorkoutFailure;

export type IState = WorkoutActions;
