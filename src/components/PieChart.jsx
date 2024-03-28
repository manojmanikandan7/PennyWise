/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";
import { Box, Text, useTheme, VStack } from "@chakra-ui/react";

import { transactions } from "../assets/testDataTransactions.json";

export default function PieChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          "#FF9F40",
        ], // Example colors, adjust as needed
      },
    ],
  });

  const theme = useTheme();

  useEffect(() => {
    const spendingByCategory = transactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      const amountNumber = parseFloat(amount.replace("£", ""));
      if (acc[category]) {
        acc[category] += amountNumber;
      } else {
        acc[category] = amountNumber;
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
  }, [transactions]); // Dependency array to ensure this runs when transactions update

  const options = {
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          color: "#000000", // Legend labels in black color
          boxWidth: 30, // Size of the color box
          padding: 27, // Spacing between legend items
          usePointStyle: false, // Use point style (circle)
          font: {
            // Chakra UI default font stack
            family: " sans-serif",
            size: 10, // You can adjust the size as needed
            style: "normal",
            weight: "normal", // Normal weight to match the Chakra UI default
          },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, index) => ({
              text: "",
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
    <Box className="chart-container" p={4} bg="white" borderRadius="lg">
      <VStack spacing="0">
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Spending by Category
        </Text>
        <Pie data={chartData} options={options} />
      </VStack>
    </Box>
  );
}
