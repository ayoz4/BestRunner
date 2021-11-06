import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartWrapper } from "./styles";

function Chart({ dataset }) {
  return (
    <ChartWrapper>
      <Bar
        data={{
          labels: [...dataset.keys()].map((_, index) => `Неделя ${index + 1}`),
          datasets: [
            {
              label: "Дистанция в км",
              data: [...dataset.values()],
              borderWidth: 1,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgb(54, 162, 235)"],
            },
          ],
        }}
        options={{
          scales: {
            yAxis: {
              title: {
                text: "qwe",
              },
            },
          },
        }}
      />
    </ChartWrapper>
  );
}

export default Chart;
