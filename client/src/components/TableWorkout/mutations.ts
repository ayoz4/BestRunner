import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { API } from "../../redux/consts";
import { Workout } from "../../redux/types";

export const useCreateWorkout = (): UseMutationResult<AxiosResponse<Workout, unknown>, AxiosError<Workout, unknown>, any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation(workout => axios.post(API + "workouts", workout), {
    onMutate: async (newWorkout) => {
      await queryClient.cancelQueries("workouts");

      const previousWorkouts = queryClient.getQueriesData("workouts");

      console.log(previousWorkouts)

      queryClient.setQueryData("workouts", (old: Workout[]) => [
        ...old,
        newWorkout,
      ]);
        
      return {
        previousWorkouts,
      };
    },
    onError: (err, newWorkout, context: { previousWorkouts: any }) => {
      queryClient.setQueriesData("workouts", context.previousWorkouts);
    },
    onSettled: () => {
      queryClient.invalidateQueries("workouts");
    },
  })
}

export const useEditWorkout = (): UseMutationResult<AxiosResponse<Workout, unknown>, AxiosError<Workout, unknown>, any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation((workout: any) => axios.put(API + `workouts/${workout.id}`, workout), {
    onSuccess: (editedWorkout) => {
      queryClient.invalidateQueries("workouts");
    },
  })
}

export const useDeleteWorkout = (): UseMutationResult<AxiosResponse<Workout, unknown>, AxiosError<Workout, unknown>, any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => axios.delete(API + `workouts/${id}`), {
    onMutate: async (deletedWorkout: any) => {
      await queryClient.cancelQueries("workouts");

      const previousWorkouts = queryClient.getQueryData("workouts");

      queryClient.setQueryData("workouts", (old: any) => {
        return old.filter((value: any) => value.id !== deletedWorkout.id);
      });

      return {
        previousWorkouts,
      };
    },
    onError: (err, deletedWorkout, context) => {
      queryClient.setQueryData("workouts", context.previousWorkouts);
    },
    onSettled: () => {
      queryClient.invalidateQueries("workouts");
    },
  })
}
