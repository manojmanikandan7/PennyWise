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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { format, parseISO } from "date-fns";
import CategorySelector from "./categorySelector"; // Make sure this path is correct

import axios from "axios"; // Import axios for HTTP requests

let initialBills = [];

function EditUpcomingBillsModal({ user_id }) {
  const getBills = async () => {
    const fetchData = await axios.post("http://localhost:3000/getBills", {
      uid: user_id
    });

    initialBills = fetchData.data;
    setLocalBills(initialBills);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localBills, setLocalBills] = useState([
    ...initialBills,
  ]);
  const [editBill, setEditBill] = useState(null); // The bill being edited

  // Handler to open the modal with the Bill to edit
  const handleEditClick = (transaction) => {
    setEditBill(transaction); // Set the transaction to edit
    onOpen(); // Open the modal
  };

  // Handler for when the "Update" button is clicked
  const handleUpdate = async () => {
    const id = editBill.bill_id;
    const title = editBill.description;
    const amount =  Number(editBill.value).toFixed(2);
    const startDate = format(parseISO(editBill.start_date), "yyyy-MM-dd");
    const endDate = format(parseISO(editBill.end_date), "yyyy-MM-dd");
    const category = editBill.category;
    const recurrence = editBill.recurrence_freq;

    await axios.post("http://localhost:3000/editBill", {
      bill_id: id,
      start_date: startDate,
      end_date: endDate,
      value: amount,
      description: title,
      category,
      recurrence
    });

    onClose(); // Close the modal
  };

  // Sort bills by start date
  const billsByDate = localBills.sort((a, b) => parseISO(a.start_date) - parseISO(b.start_date));

  const getDataAndOpen = async () => {
    await getBills();
    setEditBill(null);

    onOpen();
  };

  return (
    <>
      <Button
        onClick={() => getDataAndOpen()}
        colorScheme="cyan"
        variant="ghost"
        width="400px"
        leftIcon={<EditIcon />}
      >
        Upcoming Bill
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!editBill ? (
              <VStack divider={<Divider />} spacing={4} align="stretch">
                  {billsByDate.map((transaction) => (
                    <Box key={transaction.start_date}>
                      <Text fontSize="lg" fontWeight="semibold">
                        {format(parseISO(transaction.start_date), "PP")} - {format(parseISO(transaction.end_date), "PP")}
                      </Text>
                    
                      <Flex
                        key={transaction.bill_id}
                        justify="space-between"
                        p={2}
                        align="center"
                      >
                        <Box flex="1">
                          <Text>
                            {transaction.description} -{" "}
                            £{transaction.value} -{" "}
                            {transaction.recurrence_freq}
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
                    value={editBill.description}
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
                    value={editBill.value}
                    onChange={(e) =>
                      setEditBill({
                        ...editBill,
                        value: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    value={format(
                      parseISO(editBill.start_date),
                      "yyyy-MM-dd"
                    )}
                    onChange={(e) =>
                      setEditBill({
                        ...editBill,
                        start_date: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    value={format(
                      parseISO(editBill.end_date),
                      "yyyy-MM-dd"
                    )}
                    onChange={(e) =>
                      setEditBill({
                        ...editBill,
                        end_date: e.target.value,
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
                <FormControl mt={4}>
                  <FormLabel>Recurrence Frequency</FormLabel>
                  <RadioGroup onChange={(e) =>
                      setEditBill({
                        ...editBill,
                        recurrence_freq: e,
                      })
                    }>
                    <Stack direction="row">
                      <Radio value="Weekly">Weekly</Radio>
                      <Radio value="Monthly">Monthly</Radio>
                      <Radio value="Annually">Annually</Radio>
                    </Stack>
                  </RadioGroup>
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
