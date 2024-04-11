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

import axios from "axios"; // Import axios for HTTP requests

let initialTransactions = [];

function RemoveTransactionModal({ onTransactionChange, user_id }) {
  const getTransactions = async () => {
    const fetchData = await axios.post("http://localhost:3000/transactionsAll", {
      user_id
    });

    initialTransactions = fetchData.data;
    setLocalTransactions(initialTransactions);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localTransactions, setLocalTransactions] = useState([
    ...initialTransactions,
  ]);

  const handleRemove = async (transactionId) => {
    // Remove the transaction from the database
    await axios.post("http://localhost:3000/removeTransaction", {
      transactionId
    });

    await axios.post("http://localhost:3000/recentTransactions", {
      user_id
    });

    // Update state to filter out the removed transaction
    const updatedTransactions = localTransactions.filter(
      (transaction) => transaction.payment_id !== transactionId
    );
    setLocalTransactions(updatedTransactions);

    onTransactionChange();
  };

  // Group the local transactions by date for rendering
  const transactionsByDate = localTransactions
    .sort((a, b) => parseISO(a.payment_date) - parseISO(b.payment_date))
    .reduce((acc, transaction) => {
      const date = format(parseISO(transaction.payment_date), "PP");
      acc[date] = acc[date] || [];
      acc[date].push(transaction);
      return acc;
    }, {});

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
        width="150px"
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
                            {transaction.description} -{" "}
                            {"£" + parseFloat(transaction.value).toFixed(2)}
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
