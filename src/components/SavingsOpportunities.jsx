/* eslint-disable no-unused-vars */

import React from "react";

import { VStack, Text, HStack, Icon, Divider } from "@chakra-ui/react";
import {
  FaUtensils,
  FaCarAlt,
  FaShoppingBasket,
  FaFilm,
  FaWater,
  FaLaughBeam,
  FaTshirt,
} from "react-icons/fa";

// Import test data transactions...
import { transactions } from "../assets/testDataTransactions.json";

// Function to analyze transactions and find saving opportunities
const analyzeSpending = (transactions) => {
  const spendingSummary = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = parseFloat(transaction.amount.replace("£", ""));
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const savingOpportunities = [];

  // Food and Dining
  if (spendingSummary["Food"] > 100) {
    savingOpportunities.push({
      message:
        "You've been eating out quite often. Consider cooking at home to save more!",
      icon: FaUtensils,
    });
  }

  // Transportation
  if (spendingSummary["Transportation"] > 50) {
    savingOpportunities.push({
      message:
        "You've spent a lot on Transportation. Maybe try public transport or cycling? Or even good-old walking!",
      icon: FaCarAlt,
    });
  }

  // Groceries
  if (spendingSummary["Groceries & Laundry"] > 150) {
    savingOpportunities.push({
      message:
        "You might find savings by comparing prices at different stores or buying in bulk.",
      icon: FaShoppingBasket,
    });
  }

  // Subscriptions
  if (spendingSummary["Subscriptions"] > 30) {
    savingOpportunities.push({
      message:
        "Check if there are subscriptions you're not frequently using that you can cancel.",
      icon: FaFilm,
    });
  }

  // Utilities
  if (spendingSummary["Utilities"] > 100) {
    savingOpportunities.push({
      message:
        "You could save on utilities by being more energy-efficient or switching providers.",
      icon: FaWater,
    });
  }

  // Entertainment
  if (
    spendingSummary["Entertainment"] &&
    spendingSummary["Entertainment"] > 50
  ) {
    savingOpportunities.push({
      message:
        "Consider free entertainment options, like outdoor activities or public events.",
      icon: FaLaughBeam, // This would be a new import from FontAwesome
    });
  }

  // Clothes
  if (spendingSummary["Clothes"] && spendingSummary["Clothes"] > 100) {
    savingOpportunities.push({
      message:
        "Clothes shopping can add up. Maybe check out thrift stores or seasonal sales for deals.",
      icon: FaTshirt, // This would be a new import from FontAwesome
    });
  }

  // ...
  // ... add more conditions based on other categories and thresholds

  return savingOpportunities;
};

const savingTips = analyzeSpending(transactions);

export default function SavingsOpportunities() {
  return (
    <VStack>
      <Divider></Divider>
      <Text fontSize="2xl" as="b">
        Savings Opportunities
      </Text>
      {savingTips.length === 0 ? (
        <Text>
          No specific saving opportunities found. Keep up the good work!
        </Text>
      ) : (
        savingTips.map((tip, index) => (
          <HStack key={index}>
            <Icon as={tip.icon} />
            <Text>{tip.message}</Text>
          </HStack>
        ))
      )}
    </VStack>
  );
}
