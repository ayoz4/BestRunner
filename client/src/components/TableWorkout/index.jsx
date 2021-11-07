import React, { useState, useEffect } from "react";
import Table from "antd/lib/table/Table";
import Button from "antd/lib/button";
import message from "antd/lib/message";

import { translations } from "../utils/translations";
import { createWeeksFromDates } from "../utils/chartData";
import { createWorkout, editWorkout } from "../../redux/actions/workoutActions";
import WorkoutModal from "./WorkoutModal";
import { workoutTypes } from "./consts";
import Chart from "../Chart";
import {
  ButtonWrapper,
  OperationsWrapper,
  TableWorkoutWrapper,
  Title,
} from "./styles";

function TableWorkout({ data, deleteRow }) {
  const [dataset, setDataSet] = useState(createWeeksFromDates(data.data));
  const [isChartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    setDataSet(createWeeksFromDates(data.data));
  }, [data]);

  const columns = [
    {
      title: "Дистанция",
      dataIndex: "distance",
      sorter: (a, b) => a.distance - b.distance,
    },
    {
      title: "Дата",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Тип",
      dataIndex: "type",
      filters: workoutTypes.map((value) => ({
        text: translations[value],
        value: value,
      })),
      onFilter: (value, record) => record.type === value,
      render: (text) => translations[text],
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
    },
    {
      title: "Операция",
      render: (_, record) => (
        <OperationsWrapper>
          <WorkoutModal workout={record} action={editWorkout}>
            <a>Редактировать</a>
          </WorkoutModal>
          <a onClick={() => deleteRow(record.id)}>Удалить</a>
        </OperationsWrapper>
      ),
    },
  ];

  const openChart = () => {
    if (data.data.length < 1) {
      message.warn("Не достаточно данных для построения графика...");
      return;
    }

    setChartVisible(!isChartVisible);
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
        dataSource={data.data}
        rowKey="id"
        pagination={false}
        bordered={true}
        loading={data.isFetching}
      />

      {isChartVisible && <Chart dataset={dataset} />}
    </TableWorkoutWrapper>
  );
}

export default TableWorkout;
