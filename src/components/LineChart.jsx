import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Text, useTheme } from "@chakra-ui/react";

function LineChart({ chartData }) {
  const theme = useTheme(); // Using Chakra UI theme for styling

  const options = {
    plugins: {
      legend: {
        display: false, // Keeps the legend hidden
      },
    },
    scales: {
      xAxes: [
        {
          // Ensure you're using 'xAxes' array for Chart.js 2.x
          type: "category",
          display: true, // Ensure the axis itself is displayed
          scaleLabel: {
            display: true,
            labelString: "Time",
            color: theme.colors.gray[600], // Use theme color for scale title
            font: {
              size: theme.fontSizes.xl, // Use theme font size for scale title
            },
          },
          ticks: {
            color: theme.colors.gray[500], // Use theme color for ticks
          },
        },
      ],
      yAxes: [
        {
          // Ensure you're using 'yAxes' array for Chart.js 2.x
          display: true, // Ensure the axis itself is displayed
          scaleLabel: {
            display: true,
            labelString: "Spent (£)",
            color: theme.colors.gray[600], // Match theme
            font: {
              size: theme.fontSizes.xl, // Match theme
            },
          },
          ticks: {
            callback: function (value) {
              return "£" + value;
            },
            color: theme.colors.gray[500], // Use theme color for ticks
          },
        },
      ],
    },
  };

  return (
    <Box
      className="chart-container"
      p={4} // Padding around the chart
      bg="grey.400" // Background color
      borderRadius="lg" // Rounded corners
    >
      {/* Optional title centered above the chart */}
      <Text fontSize="2xl" mb={4} textAlign="center" fontWeight="bold">
        Spending Over Time
      </Text>
      <Line data={chartData} options={options} />
    </Box>
  );
}

export default LineChart;
