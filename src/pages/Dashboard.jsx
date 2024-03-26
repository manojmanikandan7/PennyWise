// Importing necessary components and hooks from Chakra UI for UI design
import {
  Box,
  GridItem,
  SimpleGrid,
  Grid,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

// Importing custom components used in the dashboard
import Navbar from "/src/components/navbar";
import Sidebar from "/src/components/sidebar";

// Importing Chart.js for creating charts and the necessary extensions
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "/src/components/LineChart";

// Importing hooks from React for managing state and side effects
import { useEffect, useState } from "react";
import axios from "axios"; // Importing axios for making HTTP requests

// Placeholder for spending data, to be fetched
let spendingData = [];

// Customizing the Chakra UI theme to fit the application's design
const theme = extendTheme({
  colors: {
    brand: {
      100: "#404447",
      200: "#2a5cbf",
      300: "#dfa247",
      400: "#1ed269",
      500: "#ca3a06",
    },
  },
});

// Registering the CategoryScale to be used with Chart.js
Chart.register(CategoryScale);

//Define Some Example data...
const transactions = [
  {
    id: 1,
    title: "Uber Ride",
    amount: "£12.00",
    date: "2024-03-26",
    category: "Transportation",
  },
  {
    id: 2,
    title: "Lunch at Subway",
    amount: "£8.50",
    date: "2024-03-26",
    category: "Food",
  },
  {
    id: 3,
    title: "Grocery Shopping",
    amount: "£50.00",
    date: "2024-03-27",
    category: "Groceries And Laundry",
  },
  {
    id: 4,
    title: "Netflix Subscription",
    amount: "£10.99",
    date: "2024-03-27",
    category: "Subscriptions",
  },
  {
    id: 5,
    title: "Savings Deposit",
    amount: "£100.00",
    date: "2024-03-28",
    category: "Savings/Emergencies",
  },
  // ... more transactions
];

// Dashboard component definition
export default function Dashboard() {
  // State for managing the chart data DB Connection
  /*
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
  */

  // Using useEffect to fetch spending data when the component mounts DB Connection
  /*
  useEffect(() => {
    formatSpendingData();
  }, []);
  */

  // Function to fetch and format spending data from an API DB Connection
  /*
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
      const date = transaction.date;
      const amount = parseFloat(transaction.amount.replace("£", ""));
      if (acc[date]) {
        acc[date] += amount;
      } else {
        acc[date] = amount;
      }
      return acc;
    }, {});

    const labels = Object.keys(spendingByDate).sort();
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

  // Rendering the dashboard UI
  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(7, 1fr)" bg="gray.50">
        {/* Sidebar section */}
        <GridItem
          as="aside"
          colSpan="1"
          bg="#718096"
          minHeight="100vh"
          p="30px"
        >
          <Sidebar />
        </GridItem>

        {/* Main content section, including navbar and charts */}
        <GridItem as="main" colSpan="6" p="40px">
          <Navbar />
          <SimpleGrid spacing={35} columns={3}>
            {/* Placeholder boxes for different dashboard components */}
            {/* Spending ratio, pie chart, and income details sections */}
            {["Spending Ratio", "Pie Chart", "Income Details"].map(
              (label, index) => (
                <GridItem key={index} colSpan="1">
                  <Box
                    h="200px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    boxShadow="base"
                  ></Box>
                </GridItem>
              )
            )}
            {/* Transaction history section */}
            <GridItem colSpan="1" rowSpan="2">
              <Box
                h="600px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              ></Box>
            </GridItem>
            {/* Line chart or bar chart section */}
            <GridItem colSpan="2" rowSpan="2">
              <Box
                h="600px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <div className="App">
                  <LineChart chartData={chartData} />
                </div>
              </Box>
            </GridItem>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
