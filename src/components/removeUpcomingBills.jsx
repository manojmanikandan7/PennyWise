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

let initialBills = [];

function RemoveUpcomingBillsModal({ user_id }) {
   const getBills = async () => {
    const fetchData = await axios.post("http://localhost:3000/getBills", {
      uid: user_id
    });

    initialBills = fetchData.data
    setLocalBills(initialBills);
  };


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localBills, setLocalBills] = useState([
    ...initialBills,
  ]);

  const handleRemove = async (bill_id) => {
    // Remove the transaction from the database
    await axios.post("http://localhost:3000/removeBill", {
      bill_id: bill_id
    });

    // Update state to filter out the removed bill
    const updatedBills = localBills.filter(
      (transaction) => transaction.bill_id !== bill_id
    );
    setLocalBills(updatedBills);
  };

  // Group the local transactions by date for rendering
  const billsByDate = localBills.sort((a, b) => parseISO(a.start_date) - parseISO(b.start_date));

  const getDataAndOpen = async () => {
    await getBills();

    onOpen();
  };

  return (
    <>
      <Button
        onClick={getDataAndOpen}
        colorScheme="red"
        variant="ghost"
        width="400px"
        leftIcon={<GrClose />}
      >
        Upcoming Bill
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove a Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack divider={<Divider />} spacing={4} align="stretch">
              {billsByDate.map((transaction) => (
                <Box key={transaction.start_date}>
                  <Text fontSize="lg" fontWeight="semibold" p={2}>
                  {format(parseISO(transaction.start_date), "PP")} - {format(parseISO(transaction.end_date), "PP")}
                  </Text>
                  <Flex
                    key={transaction.billd_id}
                    justify="space-between"
                    p={2}
                    align="center"
                  >
                    <Box flex="1">
                      <Text isTruncated maxWidth="80%">
                        {transaction.description} -{" "}
                        £{transaction.value} -{" "}
                        {transaction.recurrence_freq}
                        <Text fontSize="sm" color="gray.500">
                          {transaction.category}
                        </Text>
                      </Text>
                    </Box>
                    <IconButton
                      aria-label="Remove Transaction"
                      icon={<CloseIcon />}
                      onClick={() => handleRemove(transaction.bill_id)}
                      size="sm"
                      colorScheme="red"
                    />
                  </Flex>
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

export default RemoveUpcomingBillsModal;
