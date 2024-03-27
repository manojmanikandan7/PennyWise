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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import {
  FaCar,
  FaHamburger,
  FaShoppingBasket,
  FaCalendarCheck,
  FaPiggyBank,
  FaMoneyBillWave,
} from "react-icons/fa";
import { format, parseISO } from "date-fns"; // Import the necessary functions from date-fns

//Components
import Navbar from "/src/components/navbar";
import Sidebar from "/src/components/sidebar";
import { NavLink } from "react-router-dom";

// Importing Chart.js for creating charts and the necessary extensions
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "/src/components/LineChart";
import PieChart from "/src/components/PieChart";

// Importing hooks from React for managing state and side effects
import { useEffect, useState } from "react";
import axios from "axios"; // Importing axios for making HTTP requests

// Placeholder for spending data, to be fetched
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

// Define categories with their respective icons and colors
const categoryDetails = {
  Transportation: { icon: FaCar, color: "orange.400" },
  Food: { icon: FaHamburger, color: "red.400" },
  "Groceries And Laundry": { icon: FaShoppingBasket, color: "green.400" },
  Subscriptions: { icon: FaCalendarCheck, color: "blue.400" },
  "Savings/Emergencies": { icon: FaPiggyBank, color: "purple.400" },
  Other: { icon: FaMoneyBillWave, color: "black.400" },
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
  {
    id: 6,
    title: "Dinner at a Restaurant",
    amount: "£30.00",
    date: "2024-03-28",
    category: "Food",
  },
  {
    id: 7,
    title: "Gift For Friend",
    amount: "£40.00",
    date: "2024-03-29",
    category: "Other",
  },
  // Add more transactions here
];

// Helper function to format date
const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "do 'of' MMMM");
};

const formatDate_ = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "do MMM");
};

// Group transactions by date
const transactionsByDate = transactions.reduce((acc, transaction) => {
  const { date, ...rest } = transaction;
  const formattedDate = formatDate(date); // Use the helper function to format date
  acc[formattedDate] = acc[formattedDate] || [];
  acc[formattedDate].push(rest);
  return acc;
}, {});

// Registering the CategoryScale to be used with Chart.js
Chart.register(CategoryScale);

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
            <GridItem colSpan="1" rowSpan="2">
              <Box
                h="500px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <PieChart chartData={chartData} />
              </Box>
            </GridItem>
            {/* this is the income details */}
            <GridItem colSpan="2" rowSpan="2">
              <Box
                h="500px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <HStack>
                  <Stat>
                    <VStack>
                      <StatLabel>
                        <Text fontSize="xl" as="b">
                          Total Spent This Month
                        </Text>
                      </StatLabel>
                      <StatNumber>
                        {" "}
                        <Text fontSize="2xl" as="b">
                          £400.00
                        </Text>
                      </StatNumber>
                      <StatHelpText>
                        <Text fontSize="md">March 1st - March 31st</Text>
                      </StatHelpText>
                      <StatHelpText>
                        <StatArrow type="increase" color="red.500" />
                        23.36% Since Last Month
                      </StatHelpText>
                      <StatLabel>
                        <Text fontSize="xl" as="b">
                          Money Left For The Month
                        </Text>
                      </StatLabel>
                      <StatNumber>
                        {" "}
                        <Text fontSize="2xl" as="b">
                          £600.00
                        </Text>
                      </StatNumber>
                      <StatHelpText>
                        <Text fontSize="md">March 1st - March 31st</Text>
                      </StatHelpText>
                      <StatHelpText>
                        <StatArrow type="increase" color="green.500" />
                        10.42% From Last Month
                      </StatHelpText>
                      <StatLabel>
                        <Text fontSize="xl" as="b">
                          Spending Percentage %
                        </Text>
                      </StatLabel>
                      <StatNumber>
                        {" "}
                        <Text fontSize="2xl" as="b">
                          1.20%
                        </Text>
                      </StatNumber>
                      <StatHelpText>
                        <Text fontSize="md">March 1st - March 31st</Text>
                      </StatHelpText>
                      <StatHelpText>
                        <StatArrow type="decrease" color="red.500" />
                        You Are Spending More Than You Are Earning By 20%.
                      </StatHelpText>
                    </VStack>
                  </Stat>
                </HStack>
              </Box>
            </GridItem>
            {/* this is the transaction history of your most recent spending */}
            <GridItem colSpan="1" rowSpan="2">
              <Box
                h="600px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="base"
              >
                <VStack>
                  <Text fontSize="2xl" mb={4} as="b">
                    Recent Transactions
                  </Text>
                </VStack>
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
                <LineChart chartData={chartData} />
              </Box>
            </GridItem>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
