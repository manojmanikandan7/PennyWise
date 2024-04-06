/* eslint-disable no-unused-vars */

import {
  Stat,
  Box,
  HStack,
  VStack,
  StatNumber,
  Text,
  StatLabel,
  StatHelpText,
  StatArrow,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { getMonth } from "date-fns";

import React, { useEffect, useState } from "react";


export default function FinancialDetails({ refreshData, user_id }) {
  const [monthSpend, setMonthSpend] = useState();
  const [monthRemaining, setMonthRemaining] = useState();
  const [spendPercentage, setSpendPercentage] = useState();

  // Today's Date
  // Step 1: Get today's date
  const today = new Date();

  // This will create a string like "March 28, 2024"
  const todaysFormattedDate = today.toLocaleDateString("en-US", {
    month: "long", // "long" for full month name, "short" for abbreviated month name.
    day: "numeric",
    year: "numeric",
  });

  //Time
  const todaysFormattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const updateData = async () => {
    const month = getMonth(new Date()) + 1;

    const fetchData = await axios.post("http://localhost:3000/transactionsInMonth", {
      user_id, month
    })
    const monthTransactions = fetchData.data;

    let spend = 0
    monthTransactions.forEach(element => {
      spend += element.value;
    });
    
    setMonthSpend(spend);

    const userData = await axios.post("http://localhost:3000/getInfo", {
      uid: user_id
    })
    const monthlyBudget = userData.data[3] * 4;
    setMonthRemaining(monthlyBudget - spend);
    
  };
  console.log(monthRemaining)
  useEffect(() => {
    updateData();
  }, [refreshData]); // Now depends on refreshData prop

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
      <HStack>
        <Stat>
          <VStack>
            {/* Total Spent For This Month */}
            <StatLabel>
              <Text fontSize="xl" as="b">
                Total Spent This Month
              </Text>
            </StatLabel>
            <StatNumber>
              <Text fontSize="2xl" as="b">
                {"£" + monthSpend}
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" color="red.500" />
              23.36% Since Last Month
            </StatHelpText>
            {/* Money Left For The Month */}
            <Divider></Divider>
            <StatLabel>
              <Text fontSize="xl" as="b">
                Money Left For The Month
              </Text>
            </StatLabel>
            <StatNumber>
              <Text fontSize="2xl" as="b">
              {"£" + monthRemaining}
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" color="green.500" />
              10.42% From Last Month
            </StatHelpText>
            {/* Spending Percentage% */}
            <Divider></Divider>
            <StatLabel>
              <Text fontSize="xl" as="b">
                Spending Percentage %
              </Text>
            </StatLabel>
            <StatNumber>
              <Text fontSize="2xl" as="b">
                1.20%
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" color="red.500" />
              You Are Spending More Than You Can By 20%.
            </StatHelpText>
            <Divider></Divider>
            <Text fontSize="lg" as="b">
              Today
            </Text>
            <Text fontSize="lg" as="b">
              {todaysFormattedDate}
            </Text>
            <Text as="i">{todaysFormattedTime}</Text>
          </VStack>
        </Stat>
      </HStack>
    </Box>
  );
}
