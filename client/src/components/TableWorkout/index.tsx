import React, { useState, useEffect } from "react";
import Table from "antd/es/table";
import Button from "antd/es/button";
import message from "antd/es/message";
import * as Scroll from "react-scroll";

import { translations } from "../utils/translations";
import { createWeeksFromDates } from "../utils/chartData";
import WorkoutModal from "./WorkoutModal";
import { workoutTypes } from "./consts";
import Chart from "../Chart";
import {
  ButtonWrapper,
  OperationsWrapper,
  TableWorkoutWrapper,
  Title,
} from "./styles";
import { Workout } from "../../redux/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { API } from "../../redux/consts";

type TableWorkoutProps = {
  data: Workout[];
  isLoading: boolean;
};

function TableWorkout({ data = [], isLoading }: TableWorkoutProps) {
  const [dataset, setDataSet] = useState<Map<number, number>>(
    createWeeksFromDates(data)
  );
  const [isChartVisible, setChartVisible] = useState(false);

  const queryClient = useQueryClient();
  const createWorkout = useMutation(
    (workout) => {
      return axios.post(API + "workouts", workout);
    },
    {
      onMutate: async (newWorkout) => {
        await queryClient.cancelQueries("workouts");

        const previousWorkouts = queryClient.getQueriesData("workouts");

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
    }
  );
  const editWorkout = useMutation(
    (workout: Workout) => {
      return axios.put(API + `workouts/${workout.id}`, workout);
    },
    {
      onSuccess: (editedWorkout) => {
        queryClient.invalidateQueries("workouts");
      },
    }
  );
  const deleteWorkout = useMutation(
    (id: number | string) => {
      return axios.delete(API + `workouts/${id}`);
    },
    {
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
    }
  );

  useEffect(() => {
    setDataSet(createWeeksFromDates(data));
  }, [data]);

  const columns = [
    {
      title: "Дистанция",
      dataIndex: "distance",
      sorter: (a: Workout, b: Workout) => a.distance - b.distance,
    },
    {
      title: "Дата",
      dataIndex: "date",
      sorter: (a: Workout, b: Workout) => +new Date(a.date) - +new Date(b.date),
    },
    {
      title: "Тип",
      dataIndex: "type",
      filters: workoutTypes.map((value: string) => ({
        text: translations[value],
        value: value,
      })),
      onFilter: (value: string, record: Workout) => record.type === value,
      render: (text: string) => translations[text],
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
    },
    {
      title: "Операция",
      render: (_: string, record: Workout) => (
        <OperationsWrapper>
          <WorkoutModal workout={record} action={editWorkout}>
            <a>Редактировать</a>
          </WorkoutModal>
          <a onClick={() => deleteWorkout.mutate(record.id)}>Удалить</a>
        </OperationsWrapper>
      ),
    },
  ];

  const openChart = () => {
    if (data.length < 1) {
      message.warn("Не достаточно данных для построения графика...");
      return;
    }

    setChartVisible(!isChartVisible);
    Scroll.animateScroll.scrollToBottom();
  };

  return (
    <TableWorkoutWrapper>
      <Title>BestRunner</Title>

      <ButtonWrapper>
        <WorkoutModal action={createWorkout}>
          <Button type="primary">Добавить тренировку</Button>
        </WorkoutModal>
        <Button onClick={openChart}>Открыть график</Button>
      </ButtonWrapper>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        bordered={true}
        loading={isLoading}
      />

      {isChartVisible && <Chart dataset={dataset} />}
    </TableWorkoutWrapper>
  );
}

export default TableWorkout;
