import {
  Box,
  GridItem,
  SimpleGrid,
  Grid,
  Text,
  ChakraProvider,
  extendTheme,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import {
  FaCar,
  FaHamburger,
  FaShoppingBasket,
  FaCalendarCheck,
  FaPiggyBank,
} from "react-icons/fa";
import { format, parseISO } from "date-fns"; // Import the necessary functions from date-fns

//Components
import Navbar from "/src/components/navbar";
import Sidebar from "/src/components/sidebar";
import { NavLink } from "react-router-dom";

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

// Define categories with their respective icons and colors
const categoryDetails = {
  Transportation: { icon: FaCar, color: "orange.400" },
  Food: { icon: FaHamburger, color: "red.400" },
  "Groceries And Laundry": { icon: FaShoppingBasket, color: "green.400" },
  Subscriptions: { icon: FaCalendarCheck, color: "blue.400" },
  "Savings/Emergencies": { icon: FaPiggyBank, color: "purple.400" },
};

// Updated transactions with categories
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

// Helper function to format date
const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "do 'of' MMMM");
};

// Group transactions by date
const transactionsByDate = transactions.reduce((acc, transaction) => {
  const { date, ...rest } = transaction;
  const formattedDate = formatDate(date); // Use the helper function to format date
  acc[formattedDate] = acc[formattedDate] || [];
  acc[formattedDate].push(rest);
  return acc;
}, {});

export default function Dashboard() {
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
            {/* this is the transaction history of your most recent spending */}
            <GridItem colSpan="1" rowSpan="2">
              <Box
                h="600px"
                border="1px solid"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
              >
                <Text fontSize="3xl" mb={4} as="b">
                  Recent Transactions
                </Text>
                {Object.entries(transactionsByDate).map(
                  ([formattedDate, transactions], index) => (
                    <VStack key={formattedDate} spacing={4} align="stretch">
                      {index > 0 && <Divider />}
                      <NavLink to="/calendar">
                        <Text fontSize="lg" fontWeight="semibold" mt={4}>
                          {formattedDate}
                        </Text>
                      </NavLink>
                      {transactions.map((transaction, idx) => (
                        <HStack key={idx} justifyContent="space-between">
                          <HStack spacing={2}>
                            <Box
                              as={categoryDetails[transaction.category].icon}
                              color={
                                categoryDetails[transaction.category].color
                              }
                            />
                            <Text>{transaction.title}</Text>
                          </HStack>
                          <Text fontWeight="bold">{transaction.amount}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  )
                )}
              </Box>
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
              ></Box>
            </GridItem>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
