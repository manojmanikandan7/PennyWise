/* eslint-disable no-unused-vars */
import {
  Flex,
  Box,
  HStack,
  Heading,
  Spacer,
  Text,
  Button,
} from "@chakra-ui/react";

import React from "react";

export default function Navbar() {
  return (
    <Flex as="nav" p="10px" alignItems="center">
      <Heading as="h3" fontSize="37">
        Dashboard
      </Heading>
      <Spacer />

      <HStack spacing="20px">
        <Box
          bg="gray.200"
          p="10px"
          border="1px solid"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
        >
          P
        </Box>
        <Text>student@manchester.ac.uk.in</Text>
        <Button color="#718096">Logout</Button>
      </HStack>
    </Flex>
  );
}
