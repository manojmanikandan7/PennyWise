import {
  Box,
  GridItem,
  SimpleGrid,
  Grid,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Website Common Components
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

// Dashboard Components
import LineChart from "../components/lineChart";
import PieChart from "../components/pieChart";
import FinancialDetails from "../components/financialDetails";
import RecentTransactions from "../components/recentTransactions";
import UpcomingBills from "../components/upcomingBills";

// Background Task Component
import TransactionSetup from "../components/transactionSetup";

// Icons
import { MdDashboard } from "react-icons/md";

// For custom themes
// TODO: Add the theme colours
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

export default function Dashboard() {
  let location = useLocation();
  const user_id = location.state.user_id;

  const [refreshData, setRefreshData] = useState(0);
  const [dataAvailable, setDataAvailable] = useState(false);

  // Function to toggle the refresh state
  const onTransactionChange = () => {
    setRefreshData((prev) => prev + 1);
  };

  return (
    <ChakraProvider theme={theme}>
      <TransactionSetup setDataAvailable={setDataAvailable} user_id={user_id} />
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.25">
        {/* sidebar */}
        <GridItem as="aside" colSpan="1" bg="black" minHeight="100vh" p="30px">
          <Sidebar onTransactionChange={onTransactionChange} user_id={user_id} />
        </GridItem>

        {/* main content & navbar */}
        <GridItem as="main" colSpan="7" p="40px">
          <Navbar title="Dashboard" icon={MdDashboard} user_id={user_id} />
          <SimpleGrid spacing={35} columns={3}>
            {/*  */}
            {/* this is the transaction history of your most recent spending */}
            <GridItem colSpan="1">
              {dataAvailable && (<RecentTransactions />)}
            </GridItem>

            {/* Upcoming Bills And Possible Spending Recommendations? */}
            <GridItem colSpan="1">
              <UpcomingBills refreshData={refreshData} user_id={user_id}/>
            </GridItem>

            {/* this is the financial details */}
            <GridItem colSpan="1">
              {dataAvailable && (<FinancialDetails refreshData={refreshData} user_id={user_id} />)}
            </GridItem>

            {/* this is the pie chart */}
            <GridItem colSpan="1">
              <Box
                h="95%"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                {dataAvailable && (<PieChart refreshData={refreshData} user_id={user_id} />)}
              </Box>
            </GridItem>

            {/* Line chart or bar chart section */}
            <GridItem colSpan="2">
              <Box
                h="95%"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                {dataAvailable && (<LineChart refreshData={refreshData} user_id={user_id} />)}
              </Box>
            </GridItem>

            {/*  */}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
