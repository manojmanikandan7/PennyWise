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

//Test data
import axios from "axios";


function AddUpcomingBillsModal({ user_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const id = user_id;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(
    formatISO(new Date(), { representation: "date" })
  );
  const [endDate, setEndDate] = useState(
    formatISO(new Date(), { representation: "date" })
  );
  const [category, setCategory] = useState("");
  const [recurrence, setRecurrence] = useState("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/addBill", {
      uid: id,
      start_date : startDate,
      end_date: endDate,
      value: amount,
      description: title,
      category: category,
      recurrence: recurrence,
    });

    // await axios.post("http://localhost:3000/recentTransactions", { user_id });

    // Reset the form fields
    setTitle("");
    setAmount("");
    setStartDate(formatISO(new Date(), { representation: "date" }));
    setEndDate(formatISO(new Date(), { representation: "date" }));
    setCategory("");
    setRecurrence("");

    // Close the modal
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        width="400px"
        colorScheme="teal"
        variant="ghost"
      >
        Upcoming Bill
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Bill Name"
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
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <CategorySelector onSelect={setCategory} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Recurrence Frequency</FormLabel>
              <Input
                placeholder="Recurrence Frequency"
                type="number"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
              />
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

export default AddUpcomingBillsModal;
