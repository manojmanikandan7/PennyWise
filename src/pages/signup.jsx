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
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Flex } from "antd";
let fname = "",
  sname = "",
  email = "",
  password = "",
  budget = "";

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
          placeholder="First Name"
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
          placeholder="Surname"
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
          placeholder="Email"
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

const Password = ({setDisable}) => {
  const [input, setInput] = useState(" ");
  const [confirm, setConfirm] = useState(" ");

  password = input.trimStart();
  const handleInputChange = (e) => setInput(e.target.value);
  const handleConfirmChange = (e) => setConfirm(e.target.value);
  const empty = input === "";
  const noteq = (input.length < confirm.length) || (input.length === confirm.length && input !== confirm);
  setDisable(noteq);
  return (
    <Container maxWidth="xl" p="2">
      <FormControl isInvalid={empty} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          maxW="xl"
        />
        {!empty ? (
          <FormHelperText textAlign="left">Enter your password</FormHelperText>
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>
      <br></br>
      <FormControl isInvalid={noteq} isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm password"
          onChange={handleConfirmChange}
          maxW="xl"
        />
        {!noteq ? (
          <FormHelperText textAlign="left">Re-enter your password</FormHelperText>
        ) : (
          <FormErrorMessage>Passwords don&apos;t match. Try again.</FormErrorMessage>
        )}
      </FormControl>
    </Container>
  );
};

const Budget = () => {
  const [input, setInput] = useState(" ");
  budget = input.trimStart();
  const handleInputChange = (e) => setInput(e.target.value);
  const empty = input === "";

  return (
    <Container maxWidth="xl" p="2">
      <FormControl isInvalid={empty} isRequired>
        <FormLabel>Budget</FormLabel>
        <Input
          type="number"
          placeholder="Budget"
          onChange={handleInputChange}
          maxW="xl"
        />
        {!empty ? (
          <FormHelperText textAlign="left">
            Enter your weekly budget.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Budget is required.</FormErrorMessage>
        )}
      </FormControl>
    </Container>
  );
};

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/createUser", { fname, sname, email, password, budget });
      console.log("Name retrieved successfully");
    } catch (error) {
      console.error("Error retrieving name", error);
    }
  
    try {
      const result = await axios.post("http://localhost:3000/login", { email, password });
      const user_id = result.data[0].id;
  
      navigate("/dashboard", { state: { user_id: user_id } });
    } catch (error) {
      console.error("Error retrieving login", error);
    }
  };

  const [disable, setDisable]=useState(false);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack spacing={10}>
          <Heading
            as="h1"
            size="3xl"
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
            <Flex>
              <NavLink to="/">
              <Button 
                leftIcon={<ArrowBackIcon />} 
                variant="ghost" 
                colorScheme = "blue"
                p={3}
                justifySelf="flex-start">
                  Back to Homepage
                </Button> 
              </NavLink>
            </Flex>
            <Heading
                fontSize="3xl"
                fontWeight="bold"
                mb={4}
              >
                Create an account
              </Heading>
            <VStack>
              <FirstName />
              <SurName />
              <Email />
              <Password setDisable={setDisable}/>
              <Budget />
              <ButtonGroup gap="5" p={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  mt={4}
                  variant="ghost"
                  p={3}
                  onClick={handleClick}
                  isDisabled={disable}
                  isLoading={loading}
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
