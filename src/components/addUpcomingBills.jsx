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
import { upcomingBills } from "../assets/testDataUpcomingBills.json";

import axios from "axios";

import fs from "fs";

function AddUpcomingBillsModal({ user_id, updateBills }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO: Change this to the UID of the user logged in
  const id = user_id;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(
    formatISO(new Date(), { representation: "date" })
  );
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    /* await axios.post("http://localhost:3000/addTransaction", {
      id,
      duedate,
      amount,
      title,
      category,
    }); */

    // await axios.post("http://localhost:3000/recentTransactions", { user_id });

    upcomingBills.push({"id":(upcomingBills.length+1), "title": title, "amount": '£' + Number(amount).toFixed(2), "dueDate": dueDate, "category": category});
    
    
    updateBills(upcomingBills);
    

    // Reset the form fields
    setTitle("");
    setAmount("");
    setDueDate(formatISO(new Date(), { representation: "date" }));
    setCategory("");

    // Call the onTransactionSubmit callback to notify the parent component
    


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
        Upcoming Bill
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Upcoming Payment</ModalHeader>
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
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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

export default AddUpcomingBillsModal;
