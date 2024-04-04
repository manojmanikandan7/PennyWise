/* eslint-disable no-unused-vars */
import { Box, VStack, Divider, Text, HStack } from "@chakra-ui/react";
import {
  FaBolt,
  FaWater,
  FaWifi,
  FaMobileAlt,
  FaDumbbell,
  FaMoneyBillWave,
} from "react-icons/fa";
import React from "react";
import { NavLink } from "react-router-dom";
import { format, parseISO } from "date-fns";

// Import the necessary functions from date-fns
// Import test data for upcoming bills...
import { upcomingBills } from "../assets/testDataUpcomingBills.json";

//Saving Opportunities Component
import SavingsOpportunities from "../components/SavingsOpportunities";

// Helper function to format date
const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "do 'of' MMMM");
};

// Define categories with their respective icons and colors
const categoryDetails = {
  Utilities: { icon: FaBolt, color: "yellow.400" },
  Subscriptions: { icon: FaWifi, color: "blue.400" },
  "Health & Fitness": { icon: FaDumbbell, color: "green.400" },
  "Mobile Phone": { icon: FaMobileAlt, color: "teal.400" },
  // Add more categories and icons as needed
};

export default function UpcomingBills() {
  // Sort the bills by due date
  const sortedBills = upcomingBills.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

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
                  <Text>{bill.title}</Text>
                </HStack>
                <Text fontWeight="bold">{bill.amount}</Text>
              </HStack>
              <Text fontSize="sm">{formatDate(bill.dueDate)}</Text>
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
