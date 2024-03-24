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

import { useState } from "react";

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

// // Test Chart.js data
const testData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
];

Chart.register(CategoryScale);

export default function Dashboard() {
  const [chartData, setChartData] = useState({
    labels: testData.map((data) => data.year), 
    datasets: [
      {
        label: "Spent (£)",
        data: testData.map((data) => data.userGain),
        borderColor: "lightblue",
        tension: 0.25,
        borderWidth: 2,
        pointBackgroundColor: "lightblue",
      }
    ]
  });

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
