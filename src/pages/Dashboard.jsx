import {
  Box,
  GridItem,
  SimpleGrid,
  Grid,
  Text,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

//Components
import Navbar from "/src/components/navbar";
import Sidebar from "/src/components/sidebar";

// Chart.js imports
import Chart from 'chart.js/auto'
import { CategoryScale } from "chart.js";
import LineChart from "/src/components/LineChart";

import { useEffect, useState } from "react";
import axios from "axios";

let spendingData = [];

//For custom themes
//TODO: Add the theme colours
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

Chart.register(CategoryScale);

export default function Dashboard() {
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
      }
    ]
  })

  const formatSpendingData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:3000/dashboard");

      spendingData = fetchData.data
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
          }
        ]
      })
    } catch (error) {
      console.error("Error getting spending data", error);
    }
  };

  useEffect(() => {
    formatSpendingData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(7, 1fr)" bg="gray.50">
        {/* sidebar */}
        <GridItem
          as="aside"
          colSpan="1"
          bg="#718096"
          minHeight="100vh"
          p="30px"
        >
          <Sidebar />
        </GridItem>

        {/* main content & navbar */}
        <GridItem as="main" colSpan="6" p="40px">
          <Navbar />
          <SimpleGrid spacing={35} columns={3}>
            {/* this is the spending ratio */}
            <GridItem colSpan="1">
              <Box
                h="200px"
                border="1px solid"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
              ></Box>
            </GridItem>
            {/* this is the pie chart */}
            <GridItem colSpan="1">
              <Box
                h="200px"
                border="1px solid"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
              ></Box>
            </GridItem>
            {/* this is the income details */}
            <GridItem colSpan="1">
              <Box
                h="200px"
                border="1px solid"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
              ></Box>
            </GridItem>
            {/* this is the transaction history */}
            <GridItem colSpan="1" rowSpan="2">
              <Box
                h="600px"
                border="1px solid"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
              ></Box>
            </GridItem>
            {/* this is the line chart or bar chart */}
            <GridItem colSpan="2" rowSpan="2">
              <Box
                h="600px"
                border="1px solid"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
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
