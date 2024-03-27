import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Text, useTheme, VStack } from "@chakra-ui/react";

function PieChart({ chartData }) {
  const theme = useTheme(); // Using Chakra UI theme for consistent styling

  const options = {
    plugins: {
      legend: {
        position: "top", // Display the legend at the top
        labels: {
          color: theme.colors.gray[600], // Use theme color for legend labels
          font: {
            size: theme.fontSizes.md, // Use theme font size
          },
        },
      },
    },
  };

  return (
    <Box
      className="chart-container"
      p={4} // Padding around the chart
      bg="white" // Background color, adjusted to match your theme
      borderRadius="lg" // Rounded corners
    >
      {/* Optional title centered above the chart */}
      <VStack spacing="0">
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Spending by Category
        </Text>
        <Pie data={chartData} options={options} />
      </VStack>
    </Box>
  );
}

export default PieChart;
