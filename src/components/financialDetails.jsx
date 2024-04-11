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
  const getMonthSpend = async (endDate, month) => {
    // Get the total spend in a month, up to a date of endDate

    const fetchData = await axios.post("http://localhost:3000/transactionsInMonth", {
      user_id, month, endDate
    })
    const monthTransactions = fetchData.data;

    let spend = 0
    monthTransactions.forEach(element => {
      spend += element.value;
    });

    return spend;
  }
  
  const [monthSpend, setMonthSpend] = useState({});
  const [monthRemaining, setMonthRemaining] = useState({});
  const [spendPercentage, setSpendPercentage] = useState(0);

  // Today's Date
  // Step 1: Get today's date
  const today = new Date();

  // This will create a string like "March 28, 2024"
  const todaysFormattedDate = today.toLocaleDateString("en-US", {
    month: "long", // "long" for full month name, "short" for abbreviated month name.
    day: "numeric",
    year: "numeric",
  });

  // Time
  const todaysFormattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const updateData = async () => {
    const month = getMonth(today) + 1;

    // Get the percentage through the month of the current date
    const percThroughMonth = today.getDate() / new Date(today.getFullYear(), today.getMonth(), 0).getDate();

    const spentThisMonth = await getMonthSpend(today.getDate(), month);
    const spentLastMonth = await getMonthSpend(today.getDate(), month-1);
    const spentDiffPerc = Math.round(100 * spentThisMonth / spentLastMonth);
    
    setMonthSpend({
      "value": spentThisMonth,
      "percentage": spentDiffPerc
    });

    const userData = await axios.post("http://localhost:3000/getInfo", {
      uid: user_id
    })
    const monthlyBudget = userData.data[3] * 4;
    const remainingThisMonth = monthlyBudget - spentThisMonth;
    const remainingLastMonth = monthlyBudget - spentLastMonth;
    const remainingDiffPerc = Math.round(100 * remainingThisMonth / remainingLastMonth);

    setMonthRemaining({
      "value": remainingThisMonth,
      "percentage" : remainingDiffPerc
    });

    const idealSpend = percThroughMonth * monthlyBudget;
    setSpendPercentage(Math.round(100 * spentThisMonth / idealSpend));    
  };

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
                {"£" + parseFloat(monthSpend.value).toFixed(2)}
              </Text>
            </StatNumber>
            <StatHelpText>
              {monthSpend.percentage > 100
                ? <StatArrow type="increase" color="red.500" />
                : <StatArrow type="decrease" color="green.500" />
              }
              {monthSpend.percentage}% Since Last Month
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
              {"£" + parseFloat(monthRemaining.value).toFixed(2)}
              </Text>
            </StatNumber>
            <StatHelpText>
              {monthRemaining.percentage > 100
                ? <StatArrow type="increase" color="red.500" />
                : <StatArrow type="decrease" color="green.500" />
              }
              {monthRemaining.percentage}% From Last Month
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
                {spendPercentage + "%"}
              </Text>
            </StatNumber>
            <StatHelpText>
              {spendPercentage > 100
                ? <StatArrow type="increase" color="red.500" />
                : <StatArrow type="decrease" color="green.500" />
              }
              You are spending {spendPercentage > 100 ? "more than you can" : "less than you could"} by {Math.abs(spendPercentage - 100)}%
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
