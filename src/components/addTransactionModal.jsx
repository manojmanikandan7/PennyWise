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

//Components
import CategorySelector from "./categorySelector";
import axios from "axios";

function AddTransactionModal({ onTransactionChange, user_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO: Change this to the UID of the user logged in
  const id = user_id;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    formatISO(new Date(), { representation: "date" })
  );
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/addTransaction", {
      id,
      date,
      amount,
      title,
      category,
    });

    await axios.post("http://localhost:3000/recentTransactions", { user_id });

    // Reset the form fields
    setTitle("");
    setAmount("");
    setDate(formatISO(new Date(), { representation: "date" }));
    setCategory("");

    // Call the onTransactionSubmit callback to notify the parent component
    onTransactionChange();

    // Close the modal
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        width="150px"
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
