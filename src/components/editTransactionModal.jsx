/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  VStack,
  Divider,
  Text,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { format, parseISO } from "date-fns";
import CategorySelector from "./categorySelector"; // Make sure this path is correct

import axios from "axios"; // Import axios for HTTP requests

let initialTransactions = [];

function EditTransactionModal({ onTransactionChange, user_id }) {
  const getTransactions = async () => {
    const fetchData = await axios.post("http://localhost:3000/transactionsAll", {
      user_id
    });

    initialTransactions = fetchData.data
    setLocalTransactions(initialTransactions);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localTransactions, setLocalTransactions] = useState([
    ...initialTransactions,
  ]);
  const [editTransaction, setEditTransaction] = useState(null); // The transaction being edited

  // Handler to open the modal with the transaction to edit
  const handleEditClick = (transaction) => {
    setEditTransaction(transaction); // Set the transaction to edit
    onOpen(); // Open the modal
  };

  // Handler for when the "Update" button is clicked
  const handleUpdate = async () => {
    const pid = editTransaction.payment_id;
    const desc = editTransaction.description;
    const value = editTransaction.value;
    const date = format(parseISO(editTransaction.payment_date), "yyyy-MM-dd");
    const category = editTransaction.category;

    await axios.post("http://localhost:3000/editTransaction", {
      pid,
      desc,
      value,
      date,
      category,
    });

    await axios.post("http://localhost:3000/recentTransactions", {
      user_id
    });

    onClose(); // Close the modal
    onTransactionChange();
  };

  // Group transactions by date for rendering
  const transactionsByDate = localTransactions.sort((a, b) => parseISO(a.payment_date) - parseISO(b.payment_date))
    .reduce((acc, transaction) => {
      const date = format(parseISO(transaction.payment_date), "PP");
      acc[date] = acc[date] || [];
      acc[date].push(transaction);
      return acc;
  }, {});

  const getDataAndOpen = async () => {
    await getTransactions();
    setEditTransaction(null);

    onOpen();
  };

  return (
    <>
      <Button
        onClick={() => getDataAndOpen()}
        colorScheme="cyan"
        variant="solid"
        width="150px"
        leftIcon={<EditIcon />}
      >
        Transaction
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!editTransaction ? (
              <VStack divider={<Divider />} spacing={4} align="stretch">
                {Object.entries(transactionsByDate).map(
                  ([date, transactions]) => (
                    <Box key={date}>
                      <Text fontSize="lg" fontWeight="semibold">
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
                            <Text>
                              {transaction.description} -{" "}
                              {"£" + parseFloat(transaction.value).toFixed(2)}
                              <Text fontSize="sm" color="gray.500">
                                {transaction.category}
                              </Text>
                            </Text>
                          </Box>
                          <IconButton
                            aria-label="Edit Transaction"
                            icon={<EditIcon />}
                            onClick={() => handleEditClick(transaction)}
                            size="sm"
                            colorScheme="purple"
                          />
                        </Flex>
                      ))}
                    </Box>
                  )
                )}
              </VStack>
            ) : (
              // Edit form goes here
              <Box>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={editTransaction.description}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    value={editTransaction.value}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        value: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={format(
                      parseISO(editTransaction.payment_date),
                      "yyyy-MM-dd"
                    )}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        payment_date: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Category</FormLabel>
                  <CategorySelector
                    onSelect={(category) =>
                      setEditTransaction({ ...editTransaction, category })
                    }
                  />
                </FormControl>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {editTransaction && (
              <Button colorScheme="green" onClick={handleUpdate}>
                Update
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditTransactionModal;
