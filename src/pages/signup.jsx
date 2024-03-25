// eslint-disable-next-line no-unused-vars
import React from "react";
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
import { useState } from "react";
let fname = "",
  sname = "",
  email = "",
  password = "";

const FirstName = () => {
  const [input, setInput] = useState(" ");
  fname = input.trimStart();
  const handleInputChange = (e) => setInput(e.target.value);
  const empty = input === "";

  return (
    <Container maxWidth="xl" p="2">
      <FormControl isInvalid={empty} isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          value={fname}
          onChange={handleInputChange}
          maxW="xl"
        />
        {!empty ? (
          <FormHelperText textAlign="left">
            Enter your first name.
          </FormHelperText>
        ) : (
          <FormErrorMessage>First name is required.</FormErrorMessage>
        )}
      </FormControl>
    </Container>
  );
};

const SurName = () => {
  const [input, setInput] = useState(" ");
  sname = input.trimStart();
  const handleInputChange = (e) => setInput(e.target.value);
  const empty = input === "";

  return (
    <Container maxWidth="xl" p="2">
      <FormControl isInvalid={empty} isRequired>
        <FormLabel>Surname</FormLabel>
        <Input
          type="text"
          value={sname}
          onChange={handleInputChange}
          maxW="xl"
        />
        {!empty ? (
          <FormHelperText textAlign="left">Enter your surname.</FormHelperText>
        ) : (
          <FormErrorMessage>Surname is required.</FormErrorMessage>
        )}
      </FormControl>
    </Container>
  );
};

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
          type="email"
          value={email}
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
          value={password}
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
    await axios.post("http://localhost:3000/name", { fname, sname, email, password });
    console.log("Name retrieved successfully");
  } catch (error) {
    console.error("Error retrieving name", error);
  }

  try {
    await axios.post("http://localhost:3000/login", { email, password });
    console.log("Login retrieved successfully");
  } catch (error) {
    console.error("Error retrieving login", error);
  }
};

export default function SignUp() {
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
              Create an account
            </Heading>
            <VStack>
              <FirstName />
              <SurName />
              <Email />
              <Password />
              <ButtonGroup gap="5" p={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  mt={4}
                  variant="ghost"
                  p={3}
                >
                  Login
                </Button>
                <Button
                  colorScheme="blue"
                  size="lg"
                  mt={4}
                  variant="ghost"
                  p={3}
                  onClick={handleClick}
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
