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


function RemoveUpcomingBillsModal({ user_id }) {
   /* const getBills = async () => {
    const fetchData = await axios.post("http://localhost:3000/upcomingBills", {
      user_id
    });

    upcomingBills = fetchData.data
    setLocalBills(upcomingBills);
  }; */


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localBills, setLocalBills] = useState([
    ...upcomingBills,
  ]);

  const handleRemove = /*async*/ (id) => {
    // Remove the transaction from the database
    /* await axios.post("http://localhost:3000/removeBill", {
      id
    });

    await axios.post("http://localhost:3000/recentTransactions", {
      user_id
    }); */

    // Update state to filter out the removed transaction
    const updatedBills = localBills.filter(
      (a) => a.id !== id
    );
    setLocalBills(updatedBills);

    onClose(); // Close the modal
  };

  // Group the local transactions by date for rendering

  const getDataAndOpen = /*async*/ () => {
    //await getTransactions();

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
          <ModalHeader>Remove a Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack divider={<Divider />} spacing={4} align="stretch">
                    {upcomingBills.map((transaction) => (
                    <Box key={transaction.date}>
                      <Text fontSize="lg" fontWeight="semibold" p={2}>
                        {transaction.date}
                      </Text>
                      <Flex
                        key={transaction.id}
                        justify="space-between"
                        p={2}
                        align="center"
                      >
                        <Box flex="1">
                          <Text isTruncated maxWidth="80%">
                            {transaction.title} -{" "}
                            {transaction.amount}
                            <Text fontSize="sm" color="gray.500">
                              {transaction.category}
                            </Text>
                          </Text>
                        </Box>
                        <IconButton
                          aria-label="Remove Transaction"
                          icon={<CloseIcon />}
                          onClick={() => handleRemove(transaction.id)}
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
