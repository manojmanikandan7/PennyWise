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
//import CategorySelector from "./categorySelector";

function AddTransactionModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState(
    formatISO(new Date(), { representation: "date" })
  );

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="solid"
      >
        Add Transaction
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Transaction Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input placeholder="Amount" type="number" />
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
              <Select placeholder="Select category">
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Groceries And Laundry">
                  Groceries And Laundry
                </option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Savings">Savings</option>
                <option value="Other">Other</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Electronics">Electronics</option>
                <option value="Utilities">Utilities</option>
                <option value="Housing">Housing</option>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTransactionModal;
