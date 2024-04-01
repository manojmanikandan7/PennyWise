/* eslint-disable no-unused-vars */
import {
  Flex,
  Box,
  HStack,
  Heading,
  Spacer,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";

import React from "react";

import PropTypes from "prop-types";

import { MdDashboard } from "react-icons/md";

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function Navbar({ title }) {
  return (
    <Flex as="nav" p="10px" alignItems="center">
      <HStack>
        <Icon as={MdDashboard} w="10" h="20"></Icon>
        <Heading as="h3" fontSize="37">
          {title}
        </Heading>
      </HStack>
      <Spacer />

      <HStack spacing="20px">
        <Box
          bg="gray.200"
          p="10px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="base"
        >
          P
        </Box>
        <Text>student@manchester.ac.uk.in</Text>
        <Button color="#718096">Logout</Button>
      </HStack>
    </Flex>
  );
}
