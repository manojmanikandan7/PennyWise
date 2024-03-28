/* eslint-disable no-unused-vars */

import React from "react";

import { Box, Text, useTheme, VStack } from "@chakra-ui/react";

import { Line } from "react-chartjs-2"; // Import the Line component from react-chartjs-2 for line graphs
import Chart from "chart.js/auto"; // Importing Chart.js for creating charts and the necessary extensions
import { CategoryScale } from "chart.js";
import { format, parseISO } from "date-fns"; // Import the necessary functions from date-fns

import { useEffect, useState } from "react"; // Importing hooks from React for managing state and side effects

//import test data transactions...
import { transactions } from "../assets/testDataTransactions.json";

//Later we will not import the transactions from a file, but from the backend server and according to the user logged in.
//This means we will have also change the way we import the transactions in the RecentTransactions component.

//Divider -----------------------------------------------------------------------------------------------

/*
import axios from "axios"; // Importing axios for making HTTP requests

// Placeholder for spending data, to be fetched
let spendingData = [];

  const [chartData, setChartData] = useState({
    labels: spendingData.map((data) => data.x),
    datasets: [
      {
        label: "Spent (£)",
        data: spendingData.map((data) => data.y),
        borderColor: "lightblue",
        tension: 0.25,
        borderWidth: 2,
        pointBackgroundColor: "lightblue",
      },
    ],
  });

  // Using useEffect to fetch spending data when the component mounts DB Connection
  useEffect(() => {
    formatSpendingData();
  }, []);

  // Function to fetch and format spending data from an API DB Connection
  const formatSpendingData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:3000/dashboard");
      spendingData = fetchData.data;
      setChartData({
        labels: spendingData.map((data) => data.x),
        datasets: [
          {
            label: "Spent (£)",
            data: spendingData.map((data) => data.y),
            borderColor: "lightblue",
            tension: 0.25,
            borderWidth: 2,
            pointBackgroundColor: "lightblue",
          },
        ],
      });
    } catch (error) {
      console.error("Error getting spending data", error);
    }
  };
  */

//Divider -----------------------------------------------------------------------------------------------

const formatDate_ = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "do MMM");
};

// Registering the CategoryScale to be used with Chart.js
Chart.register(CategoryScale);

export default function LineChart() {
  // Chart data stuff
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Spent (£)",
        data: [],
        borderColor: "lightblue",
        tension: 0.25,
        borderWidth: 2,
        pointBackgroundColor: "lightblue",
      },
    ],
  });

  useEffect(() => {
    const spendingByDate = transactions.reduce((acc, transaction) => {
      const { date, ...rest } = transaction;
      const formattedDate = formatDate_(date); // Use the helper function to format date
      const amount = parseFloat(transaction.amount.replace("£", ""));
      if (acc[formattedDate]) {
        acc[formattedDate] += amount;
      } else {
        acc[formattedDate] = amount;
      }
      return acc;
    }, {});

    // Convert the object keys (dates) back to an array, sort them based on actual date values, and then map to formatted labels
    const labels = Object.keys(spendingByDate)
      .map((date) => ({
        formatted: date,
        parsed: parseISO(date),
      }))
      .sort((a, b) => a.parsed - b.parsed)
      .map((item) => item.formatted);

    const data = labels.map((label) => spendingByDate[label]);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Spent (£)",
          data: data,
          borderColor: "lightblue",
          tension: 0.25,
          borderWidth: 2,
          pointBackgroundColor: "lightblue",
        },
      ],
    });
  }, []);

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
      bg="grey.400" // Background color
      borderRadius="lg" // Rounded corners
    >
      {/* Optional title centered above the chart */}
      <VStack>
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Spending Over Time
        </Text>
        <Line data={chartData} options={options} />
      </VStack>
    </Box>
  );
}
