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

import { upcomingBills } from "../assets/testDataUpcomingBills.json";


function EditUpcomingBillsModal({ updateBills, user_id }) {
  /* const getTransactions = async () => {
    const fetchData = await axios.post("http://localhost:3000/transactionsAll", {
      user_id
    });

    initialTransactions = fetchData.data
    setLocalTransactions(initialTransactions);
  }; */


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localBills, setLocalBills] = useState([
    ...upcomingBills,
  ]);
  const [editBill, setEditBill] = useState(null); // The Bill being edited

  // Handler to open the modal with the Bill to edit
  const handleEditClick = (transaction) => {
    setEditBill({...transaction, "amount": transaction.amount.substring(1)}); // Set the transaction to edit
    onOpen(); // Open the modal
  };

  // Handler for when the "Update" button is clicked
  const handleUpdate = async () => {
    const id = editBill.id;
    const title = editBill.title;
    const amount =  '£' + Number(editBill.amount).toFixed(2);
    const dueDate = format(parseISO(editBill.dueDate), "yyyy-MM-dd");
    const category = editBill.category;

    /* await axios.post("http://localhost:3000/editTransaction", {
      pid,
      desc,
      value,
      date,
      category,
    });

    await axios.post("http://localhost:3000/recentTransactions", {
      user_id
    }); */

    upcomingBills.forEach((a)=>{
      if (a.id === id){
        a.title = title;
        a.amount = amount;
        a.dueDate = dueDate;
        a.category = category;
      }
    })


    onClose(); // Close the modal
    updateBills(upcomingBills);
  }; 

  const getDataAndOpen = () => {
    setEditBill(null);

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
        Edit Bills
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!editBill ? (
              <VStack divider={<Divider />} spacing={4} align="stretch">
                    {upcomingBills.map((transaction) => (
                      <Box key={transaction.dueDate}>
                        <Text fontSize="lg" fontWeight="semibold">
                          {transaction.dueDate}
                        </Text>
                      
                        <Flex
                          key={transaction.id}
                          justify="space-between"
                          p={2}
                          align="center"
                        >
                          <Box flex="1">
                            <Text>
                              {transaction.title} -{" "}
                              {transaction.amount}
                              <Text fontSize="sm" color="gray.500">
                                {transaction.category}
                              </Text>
                            </Text>
                          </Box>
                          <IconButton
                            aria-label="Edit Bill"
                            icon={<EditIcon />}
                            onClick={() => handleEditClick(transaction)}
                            size="sm"
                            colorScheme="purple"
                          />
                        </Flex>
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
                    value={editBill.title}
                    onChange={(e) =>
                      setEditBill({
                        ...editBill,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    value={editBill.amount}
                    onChange={(e) =>
                      setEditBill({
                        ...editBill,
                        amount: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={format(
                      parseISO(editBill.dueDate),
                      "yyyy-MM-dd"
                    )}
                    onChange={(e) =>
                      setEditBill({
                        ...editBill,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Category</FormLabel>
                  <CategorySelector
                    onSelect={(category) =>
                      setEditBill({ ...editBill, category })
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
            {editBill && (
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

export default EditUpcomingBillsModal;
