import React, { useEffect, useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  VStack,
  Divider,
  Text,
  IconButton,
  Flex,
  ModalFooter,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { GrClose } from "react-icons/gr";
import { format, parseISO } from "date-fns";

import axios from 'axios' // Import axios for HTTP requests

// Assuming transactions is your initial array from the JSON file
// import { transactions as initialTransactions } from "../assets/testDataTransactions.json"; // Adjust path as necessary

let initialTransactions = [];

function RemoveTransactionModal() {
  const getTransactions = async () => {
    const fetchData = await axios.get("http://localhost:3000/transactionsAll");

    initialTransactions = fetchData.data;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localTransactions, setLocalTransactions] = useState([
    ...initialTransactions,
  ]);

  const handleRemove = (transactionId) => {
    // Log the transaction to remove
    console.log("Transaction to Remove ID:", transactionId);

    // Update state to filter out the removed transaction
    const updatedTransactions = localTransactions.filter(
      (transaction) => transaction.payment_id !== transactionId
    );
    initialTransactions = updatedTransactions;
  };

  // Group the local transactions by date for rendering
  const transactionsByDate = initialTransactions.sort((a, b) => parseISO(a.payment_date) - parseISO(b.payment_date))
  .reduce((acc, transaction) => {
    const date = format(parseISO(transaction.payment_date), "PP");
    acc[date] = acc[date] || [];
    acc[date].push(transaction);
    return acc;
  }, {})

  const getDataAndOpen = async () => {
    await getTransactions();

    onOpen();
  };

  return (
    <>
      <Button
        onClick={getDataAndOpen}
        colorScheme="red"
        variant="solid"
        leftIcon={<GrClose />}
      >
        Transaction
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove a Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack divider={<Divider />} spacing={4} align="stretch">
              {Object.entries(transactionsByDate).map(
                ([date, transactions]) => (
                  <Box key={date}>
                    <Text fontSize="lg" fontWeight="semibold" p={2}>
                      {date}
                    </Text>
                    {transactions.map((transaction) => (
                      <Flex
                        key={transaction.payment_id}
                        justify="space-between"
                        p={2}
                        align="center"
                      >
                        <Box flex="1">
                          <Text isTruncated maxWidth="80%">
                            {transaction.description} - {transaction.value}
                            <Text fontSize="sm" color="gray.500">
                              {transaction.category}
                            </Text>
                          </Text>
                        </Box>
                        <IconButton
                          aria-label="Remove Transaction"
                          icon={<CloseIcon />}
                          onClick={() => handleRemove(transaction.payment_id)}
                          size="sm"
                          colorScheme="red"
                        />
                      </Flex>
                    ))}
                  </Box>
                )
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RemoveTransactionModal;
