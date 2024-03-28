import {
  Box,
  GridItem,
  SimpleGrid,
  Grid,
  Text,
  ChakraProvider,
  extendTheme,
  VStack,
  Divider,
  List,
  ListItem,
} from "@chakra-ui/react";

//Website Common Components
import Navbar from "/src/components/navbar";
import Sidebar from "/src/components/sidebar";

//Dashboard Components
import LineChart from "/src/components/LineChart";
import PieChart from "/src/components/PieChart";
import FinancialDetails from "../components/financialDetails";
import RecentTransactions from "../components/recentTransactions";

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
            {/* this is the pie chart */}
            <GridItem colSpan="1">
              <Box
                h="500px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <PieChart />
              </Box>
            </GridItem>

            {/* Upcoming Bills And Possible Spending Recommendations? */}
            <GridItem colSpan="1">
              <Box
                h="500px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <VStack>
                  <List>
                    <ListItem>
                      <Text fontSize="2xl" mb={4} fontWeight="bold">
                        Upcoming Bills
                      </Text>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem>
                      <Text fontSize="2xl" mb={4} fontWeight="bold">
                        Recommendations
                      </Text>
                    </ListItem>
                  </List>
                </VStack>
              </Box>
            </GridItem>

            {/* this is the financial details */}
            <GridItem colSpan="1">
              <FinancialDetails></FinancialDetails>
            </GridItem>

            {/* this is the transaction history of your most recent spending */}
            <GridItem colSpan="1" rowSpan="2">
              <RecentTransactions></RecentTransactions>
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
                <LineChart />
              </Box>
            </GridItem>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
