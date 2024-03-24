import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}></h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            x: {
              title: {
                text: "Time",
                display: true
              }
            },
            y: {
              title: {
                text: "Spent (£)",
                display: true,
              },
              ticks: {
                callback: function(value, index, ticks) {
                  return '£' + value;
                }
              }
            },
          }
        }}
      />
    </div>
  );
}
export default LineChart;