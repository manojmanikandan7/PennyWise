/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";
import { Box, Text, useTheme, VStack } from "@chakra-ui/react";
import axios from "axios";

// import { transactions } from "../assets/testDataTransactions.json";

export default function PieChart({ refreshData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384", // Radish Red
          "#36A2EB", // Sky Blue
          "#FFCE56", // Sunny Yellow
          "#4BC0C0", // Sea Green
          "#9966FF", // Lavender Purple
          "#C9CBCF", // Light Gray
          "#FF9F40", // Tangerine
          "#4682B4", // Steel Blue
          "#6A5ACD", // Slate Blue
          "#20B2AA", // Light Sea Green
          "#FF4500", // Orange Red
          "#DA70D6", // Orchid
          "#8FBC8F", // Dark Sea Green
          "#B0C4DE", // Light Steel Blue
          "#D2691E", // Chocolate
          "#F08080", // Light Coral
          "#E6E6FA", // Lavender
          "#FFFACD", // Lemon Chiffon
          "#ADD8E6", // Light Blue
          "#F0E68C", // Khaki
          "#D3D3D3", // Light Grey
          "#90EE90", // Light Green
          "#FFB6C1", // Light Pink
        ],
      },
    ],
  });

  const theme = useTheme();

  let transactions;
  const updateTransactions = async () => {
    const fetchData = await axios.get(
      "http://localhost:3000/transactionsByCategory"
    );
    transactions = fetchData.data;

    const spendingByCategory = transactions.reduce((acc, transaction) => {
      const { category, value } = transaction;
      if (acc[category]) {
        acc[category] += value;
      } else {
        acc[category] = value;
      }
      return acc;
    }, {});

    const labels = Object.keys(spendingByCategory);
    const data = labels.map((label) => spendingByCategory[label]);

    setChartData((prevState) => ({
      ...prevState,
      labels: labels,
      datasets: [
        {
          ...prevState.datasets[0],
          data: data,
        },
      ],
    }));
  };

  useEffect(() => {
    updateTransactions();
  }, [refreshData]); // Now depends on refreshData prop

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          color: "#000000", // Legend labels in black color
          boxWidth: 10, // Size of the color box
          padding: 17, // Spacing between legend items
          usePointStyle: false, // Use point style (circle)
          font: {
            // Chakra UI default font stack
            family: " system-ui",
            size: 11, // You can adjust the size as needed
            style: "normal",
            weight: "normal", // Normal weight to match the Chakra UI default
          },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, index) => ({
              text: label,
              fillStyle: datasets[0].backgroundColor[index], // Match the pie segment color
              strokeStyle: "#000000",
              lineWidth: 0.5,
              hidden: !chart.getDataVisibility(index),
              index,
            }));
          },
        },
      },
    },
  };

  return (
    <Box className="chart-container" p={1} bg="white" borderRadius="lg">
      <VStack>
        <Text fontSize="2xl" fontWeight="bold">
          Spending by Category
        </Text>
        <Pie data={chartData} options={options} />
      </VStack>
    </Box>
  );
}
