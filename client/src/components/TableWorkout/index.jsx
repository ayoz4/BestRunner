import React from "react";
import Table from "antd/lib/table/Table";
import Button from "antd/lib/button";
import WorkoutModal from "./WorkoutModal";
import { createWorkout, editWorkout } from "../../redux/actions/workoutActions";

function TableWorkout({ data, deleteRow }) {
  const columns = [
    {
      title: "Дистанция",
      dataIndex: "distance",
    },
    {
      title: "Дата",
      dataIndex: "date",
    },
    {
      title: "Тип",
      dataIndex: "type",
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
    },
    {
      title: "Операция",
      render: (text, record) => (
        <>
          <WorkoutModal workout={record} action={editWorkout}>
            <a>Редактировать</a>
          </WorkoutModal>
          <a onClick={() => deleteRow(record.id)}>Удалить</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <WorkoutModal action={createWorkout}>
        <Button type="primary">Добавить тренировку</Button>
      </WorkoutModal>

      <Table
        columns={columns}
        dataSource={data.data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              console.log(e.target);
            },
          };
        }}
      />
    </div>
  );
}

export default TableWorkout;
