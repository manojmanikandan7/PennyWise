/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Heading,
  Box,
  VStack,
  Button,
  theme,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  ButtonGroup,
} from "@chakra-ui/react";

let email = "",
  password = "";

const Email = () => {
  const [input, setInput] = useState(" ");
  email = input.trimStart();
  const handleInputChange = (e) => setInput(e.target.value);
  const empty = input === "";

  return (
    <Container maxWidth="xl" p="2">
      <FormControl isInvalid={empty} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          type="email"
          _placeholder={input}
          onChange={handleInputChange}
          maxW="xl"
        />
        {!empty ? (
          <FormHelperText textAlign="left">
            Enter your email for the account.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
    </Container>
  );
};

const Password = () => {
  const [input, setInput] = useState(" ");
  password = input.trimStart();
  const handleInputChange = (e) => setInput(e.target.value);
  const empty = input === "";

  return (
    <Container maxWidth="xl" p="2">
      <FormControl isInvalid={empty} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          _placeholder={input}
          onChange={handleInputChange}
          maxW="xl"
        />
        {!empty ? (
          <FormHelperText textAlign="left">Enter your password</FormHelperText>
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>
    </Container>
  );
};

const handleClick = async () => {
  try {
    await axios.post("http://localhost:3000/login", { email, password });
    console.log("User login successful");

    /* fetch('http://localhost:3000/login')
    .then(response => {
    if(response.ok) {
        return response.json();
    }
    }).then(data => {
    if(data) {
        console.log(data);
    }
    }).catch(err => console.error(err)); */
  } catch (error) {
    console.error("Error logging in user", error);
  }
};

export default function Login() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack spacing={10}>
          <Heading
            as="h1"
            size="3xl"
            fontFamily="Futura"
            colorScheme="brand"
            paddingY={7}
          >
            PennyWise
          </Heading>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            w="50%"
            p={4}
            boxShadow="md"
          >
            <Heading
              fontSize="3xl"
              fontWeight="bold"
              mb={4}
              paddingY={3}
              paddingTop={4}
            >
              Login
            </Heading>
            <VStack>
              <Email />
              <Password />
              <ButtonGroup gap="5" p={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  mt={4}
                  variant="ghost"
                  p={3}
                  onClick={handleClick}
                >
                  Login
                </Button>
                <Button
                  colorScheme="blue"
                  size="lg"
                  mt={4}
                  variant="ghost"
                  p={3}
                >
                  Sign Up
                </Button>
              </ButtonGroup>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
