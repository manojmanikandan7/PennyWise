// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";

import {
  ChakraProvider,
  Flex,
  VStack,
  extendTheme,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "/src/Logo.jsx";

//For custom themes
//TODO: Add the theme colours
const theme = extendTheme({
  colors: {
    brand: {
      100: "#404447",
      200: "#2a5cbf",
      300: "#dfa247",
      400: "#1ed269",
      500: "#ca3a06",
    },
  },
});

export default function DevDash() {
  return (
    <ChakraProvider theme={theme}>
      <Flex justify="center" align="center" minH="100vh" paddingBottom={10}>
        <VStack spacing={10}>
          <Heading as="h1" size="4xl" fontFamily="system-ui" colorScheme="brand">
            PennyWise
          </Heading>
          <br></br>
          <Logo
            h="40vmin"
            pointerEvents="none"
            color="brand.300"
            boxSize="3.5em"
          />
          <br></br>

          <Stack spacing={10} direction='row' align='center'>
        <NavLink to="/login">
          <Button colorScheme="brand" size="lg" variant="solid">
            Login
          </Button>
        </NavLink>

        <NavLink to="/sign-up">
          <Button colorScheme="brand" size="lg" variant="solid">
            Sign-Up
          </Button>
        </NavLink>
          </Stack>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}
