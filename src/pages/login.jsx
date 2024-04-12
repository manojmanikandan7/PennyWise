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
  Flex,
  Text
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom"

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
      </Container>
    );
  };

  export default function Login() {
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState(true);

  const navigate = useNavigate();
  const handleClick = async () => {
    setLoading(true);
    
    try {
      const result = await axios.post("http://localhost:3000/login", { email, password });
      const user_id = result.data[0].id;
      
      navigate("/dashboard", { state: { user_id: user_id } });
    } catch (error) {
      console.error("Error logging in user", error);
      setLoading(false);
      setCorrect(false);
    }
  };
  
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
              Login
            </Heading>
            <VStack>
              <Email />
              <Password />
              <Text
                fontSize="md"
                color={"red"}
              >
                {!correct ? "Incorrect email or password" : ""}
              </Text>
              <ButtonGroup gap="5" p={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  mt={4}
                  variant="ghost"
                  p={3}
                  onClick={handleClick}
                  isLoading={loading}
                >
                  Login
                </Button>
                <NavLink to="/sign-up">
                  <Button
                      colorScheme="blue"
                      size="lg"
                      mt={4}
                      variant="ghost"
                      p={3}
                    >
                      Sign Up
                  </Button>  
                </NavLink>
              </ButtonGroup>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
