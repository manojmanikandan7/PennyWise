/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

//Icons
import { AddIcon } from "@chakra-ui/icons";

//Dates
import { formatISO } from "date-fns";

//placeholder ID
import { v4 as uuidv4 } from "uuid"; // You need to import uuid to use uuidv4

//Components
import CategorySelector from "./categorySelector";

function AddTransactionModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    formatISO(new Date(), { representation: "date" })
  );
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    const newTransaction = {
      id: uuidv4(), // Generate a unique ID for the transaction
      title, // Use the value from the state
      amount: `£${amount}`, // Prefix the amount with £ and use the value from the state
      date, // Use the value from the state
      category, // Use the value from the state
    };

    console.log("New Transaction:", newTransaction);

    // Reset the form fields
    setTitle("");
    setAmount("");
    setDate(formatISO(new Date(), { representation: "date" }));
    setCategory("");

    // Close the modal
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="solid"
      >
        Transaction
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Transaction Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <CategorySelector onSelect={setCategory} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="green" onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTransactionModal;
