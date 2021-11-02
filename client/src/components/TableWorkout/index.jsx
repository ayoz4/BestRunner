import React from "react";
import Table from "antd/lib/table/Table";

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
        <a onClick={() => deleteRow(record.id)}>Удалить</a>
      ),
    },
  ];

  return (
    <div>
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
