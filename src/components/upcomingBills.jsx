/* eslint-disable no-unused-vars */
import { Box, VStack, Divider, Text, HStack } from "@chakra-ui/react";

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

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { format, parseISO } from "date-fns";

// Import the necessary functions from date-fns
// Import test data for upcoming bills...

//Saving Opportunities Component
import SavingsOpportunities from "../components/SavingsOpportunities";
import axios from "axios";

// Helper function to format date
const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "do 'of' MMMM");
};

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

function padPrice(price) {
  let initial = String(price);
  let parts = initial.split(".");

  if (parts.length == 1) {
    initial += ".00"
  } else if (parts[1].length == 1) {
    initial += "0"
  }

  return initial;
}

export default function UpcomingBills({ user_id }) {
  const [sortedBills, setSortedBills] = useState([]);

  // Get today's date
  const today = new Date();

  const getUpcomingBills = async () => {
    const fetchData = await axios.post("http://localhost:3000/upcomingBills", {
      uid: user_id,
      current_date: today
    })

    setSortedBills(fetchData.data);
  };

  getUpcomingBills();

  return (
    <Box
      h="500px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="base"
      scrollBehavior="inside"
      overflowY="auto"
    >
      <VStack>
        <Text fontSize="2xl" as="b" mb="25px">
          Upcoming Bills
        </Text>
      </VStack>
      <Box overflowY="auto">
        {sortedBills.map((bill, index) => (
          <VStack key={bill.id} spacing={3} align="stretch">
            {index > 0 && <Divider />}
            <NavLink to="/bills">
              <HStack justifyContent="space-between">
                <HStack spacing={2}>
                  <Box
                    as={categoryDetails[bill.category]?.icon || FaMoneyBillWave}
                    color={categoryDetails[bill.category]?.color || "gray.500"}
                  />
                  <Text>{bill.description}</Text>
                </HStack>
                <Text fontWeight="bold">{"£" + padPrice(bill.value)}</Text>
              </HStack>
              <Text fontSize="sm">{formatDate(bill.date)}</Text>
            </NavLink>
          </VStack>
        ))}
      </Box>
      <VStack>
        <Divider></Divider>
        <Box
          scrollBehavior="inside"
          overflow="hidden"
          overflowY="auto"
          mt="10px"
        >
          <SavingsOpportunities />
        </Box>
      </VStack>
    </Box>
  );
}
