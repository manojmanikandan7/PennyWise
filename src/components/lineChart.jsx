/* eslint-disable no-unused-vars */

import React from "react";

import { Box, Text, useTheme, VStack } from "@chakra-ui/react";

import { Line } from "react-chartjs-2"; // Import the Line component from react-chartjs-2 for line graphs
import Chart from "chart.js/auto"; // Importing Chart.js for creating charts and the necessary extensions
import { CategoryScale } from "chart.js";
import { format, parseISO } from "date-fns"; // Import the necessary functions from date-fns

import { useEffect, useState } from "react"; // Importing hooks from React for managing state and side effects

import axios from 'axios' // Import axios for HTTP requests

const dbDateToISO = (dateString) => {
  let dateParts = dateString.split("/");
  if (dateParts[1].length == 1) dateParts[1] = "0" + dateParts[1];
  if (dateParts[0].length == 1) dateParts[0] = "0" + dateParts[0];

  return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
}

const isoDateToDB = (date) => {
  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
}

// Helper function to format date
const formatDate_ = (dateString) => {
  let isoDate = dbDateToISO(dateString);

  const date = parseISO(isoDate);
  return format(date, "do MMM");
};

// Registering the CategoryScale to be used with Chart.js
Chart.register(CategoryScale);

export default function LineChart({ refreshData, user_id }) {
  // Chart data state
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
  }, [refreshData]); // Depend on refreshData prop to update

  // Function to fetch and format spending data from an API DB Connection
  const formatSpendingData = async () => {
    try {
      const fetchData = await axios.post("http://localhost:3000/transactionsByDate", { user_id });
      spendingData = fetchData.data
                      .sort((a, b) => parseISO(dbDateToISO(a.x)) - parseISO(dbDateToISO(b.x)));

      // Add £0 values for dates with no data currently
      const startDate = parseISO(dbDateToISO(spendingData[0].x));
      const endDate = parseISO(dbDateToISO(spendingData[spendingData.length - 1].x));
      const datesInUse = spendingData.map(obj => (obj.x));

      for (let x=startDate; x<endDate; x.setTime(x.getTime() + 86400000)) {
        if (!datesInUse.includes(isoDateToDB(x))) {
          spendingData.push({
            "x": isoDateToDB(x),
            "y": 0
          })
        }
      }

      spendingData.sort((a, b) => parseISO(dbDateToISO(a.x)) - parseISO(dbDateToISO(b.x)));

      setChartData({
        labels: spendingData.map((data) => formatDate_(data.x)),
        datasets: [
          {
            label: "Spent (£)",
            data: spendingData.map((data) => (data.y)),
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

  const theme = useTheme(); // Using Chakra UI theme for styling

  const options = {
    responsive: true,
    layout: {
      padding: {
        bottom: 20 // Pad the bottom of the graph so the label is visible, there is probably a better way to do this
      }
    },
    plugins: {
      legend: {
        display: false, // Keeps the legend hidden
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return "£" + parseFloat(tooltipItem.formattedValue).toFixed(2);
          }
        }
      }
    },
    scales: {
      x:
        {
          type: "category",
          display: true, // Ensure the axis itself is displayed
          title: {
            text: "Time",
            display: true,
            color: theme.colors.gray[600], // Use theme color for scale title

            // TODO: Fix: Attempting to change the size stops the text from rendering
            // font: {
            //   size: theme.fontSizes.xl, // Use theme font size for scale title
            // },
          },
          ticks: {
            color: theme.colors.gray[500], // Use theme color for ticks
          },
        },
      y:
        {
          display: true, // Ensure the axis itself is displayed
          title: {
            display: true,
            text: "Spent (£)",
            color: theme.colors.gray[600], // Match theme

            // TODO: See above
            // font: {
            //   size: theme.fontSizes.xl, // Match theme
            // },
          },
          ticks: {
            callback: function (value) {
              return "£" + value;
            },
            color: theme.colors.gray[500], // Use theme color for ticks
          },
        },
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
        <Text fontSize="2xl" mb={0} fontWeight="bold">
          Spending Over Time
        </Text>
        <Line data={chartData} options={options} />
      </VStack>
    </Box>
  );
}
