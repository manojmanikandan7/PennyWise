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

import { transactions as initialTransactions } from "../assets/testDataTransactions.json"; // Adjust the import path as needed

function EditTransactionModal() {
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
  const handleUpdate = () => {
    console.log("Updated Transaction:", editTransaction);
    // Logic to update the transaction in the state would go here
    onClose(); // Close the modal
  };

  // Group transactions by date for rendering
  const transactionsByDate = localTransactions.reduce((acc, transaction) => {
    const date = format(parseISO(transaction.date), "PP");
    acc[date] = acc[date] || [];
    acc[date].push(transaction);
    return acc;
  }, {});

  return (
    <>
      <Button
        onClick={() => setEditTransaction(null) || onOpen()}
        colorScheme="cyan"
        variant="solid"
        leftIcon={<EditIcon />}
      >
        Edit Transaction
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
                          key={transaction.id}
                          justify="space-between"
                          p={2}
                          align="center"
                        >
                          <Box flex="1">
                            <Text>
                              {transaction.title} - {transaction.amount}
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
              <form>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={editTransaction.title}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        title: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    value={editTransaction.amount.replace("£", "")}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        amount: `£${e.target.value}`,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={format(parseISO(editTransaction.date), "yyyy-MM-dd")}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        date: e.target.value,
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
              </form>
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
