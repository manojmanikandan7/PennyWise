/* eslint-disable no-unused-vars */

import { Box, HStack, VStack, Divider, Text } from "@chakra-ui/react";

import {
  FaCar,
  FaHamburger,
  FaShoppingBasket,
  FaCalendarCheck,
  FaPiggyBank,
  FaMoneyBillWave,
  FaFilm,
  FaBook,
  FaDumbbell,
  FaMobileAlt,
  FaBolt,
  FaHome,
} from "react-icons/fa";

import React from "react";
import { NavLink } from "react-router-dom";
import { format, parseISO } from "date-fns"; // Import the necessary functions from date-fns

//import test data transactions...
import { transactions } from "../assets/testDataTransactions.json";

//Later we will not import the transactions from a file, but from the backend server and according to the user logged in.
//This means we will have also change the way we import the transactions in the RecentTransactions component.

// Helper function to format date
const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "do 'of' MMMM");
};

// Sort transactions by date in descending order
const sortedTransactions = transactions.sort(
  (a, b) => parseISO(b.date) - parseISO(a.date)
);

// Group transactions by date
const transactionsByDate = transactions.reduce((acc, transaction) => {
  const { date, ...rest } = transaction;
  const formattedDate = formatDate(date); // Use the helper function to format date
  acc[formattedDate] = acc[formattedDate] || [];
  acc[formattedDate].push(rest);
  return acc;
}, {});

// Define categories with their respective icons and colors
const categoryDetails = {
  Transportation: { icon: FaCar, color: "orange.400" },
  Food: { icon: FaHamburger, color: "red.400" },
  "Groceries & Laundry": { icon: FaShoppingBasket, color: "green.400" },
  Subscriptions: { icon: FaCalendarCheck, color: "blue.400" },
  Savings: { icon: FaPiggyBank, color: "purple.400" },
  Other: { icon: FaMoneyBillWave, color: "black.400" },
  Entertainment: { icon: FaFilm, color: "pink.400" },
  Education: { icon: FaBook, color: "cyan.400" },
  "Health & Fitness": { icon: FaDumbbell, color: "green.500" },
  Electronics: { icon: FaMobileAlt, color: "yellow.600" },
  Utilities: { icon: FaBolt, color: "blue.300" },
  Housing: { icon: FaHome, color: "orange.300" },
  // Add more categories as needed
};

export default function RecentTransactions() {
  return (
    <Box
      h="500px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="base"
      overflowY="auto"
      scrollBehavior="inside"
    >
      <VStack>
        <Text fontSize="2xl" as="b">
          Recent Transactions
        </Text>
      </VStack>
      <Box>
        {Object.entries(transactionsByDate).map(
          ([formattedDate, transactions], index) => (
            <VStack key={formattedDate} spacing={3} align="stretch">
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
                      color={categoryDetails[transaction.category].color}
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
    </Box>
  );
}
