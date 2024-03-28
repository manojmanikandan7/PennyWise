import {
  Box,
  GridItem,
  SimpleGrid,
  Grid,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

//Website Common Components
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

//Dashboard Components
import LineChart from "../components/lineChart";
import PieChart from "../components/pieChart";
import FinancialDetails from "../components/financialDetails";
import RecentTransactions from "../components/recentTransactions";
import UpcomingBills from "../components/upcomingBills";

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

export default function Dashboard() {
  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.25">
        {/* sidebar */}
        <GridItem as="aside" colSpan="1" bg="black" minHeight="100vh" p="30px">
          <Sidebar />
        </GridItem>

        {/* main content & navbar */}
        <GridItem as="main" colSpan="7" p="40px">
          <Navbar />
          <SimpleGrid spacing={35} columns={3}>
            {/*  */}
            {/* this is the transaction history of your most recent spending */}
            <GridItem colSpan="1">
              <RecentTransactions />
            </GridItem>

            {/* Upcoming Bills And Possible Spending Recommendations? */}
            <GridItem colSpan="1">
              <UpcomingBills />
            </GridItem>

            {/* this is the financial details */}
            <GridItem colSpan="1">
              <FinancialDetails />
            </GridItem>

            {/* this is the pie chart */}
            <GridItem colSpan="1">
              <Box
                h="550px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <PieChart />
              </Box>
            </GridItem>

            {/* Line chart or bar chart section */}
            <GridItem colSpan="2">
              <Box
                h="550px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <LineChart />
              </Box>
            </GridItem>

            {/*  */}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
