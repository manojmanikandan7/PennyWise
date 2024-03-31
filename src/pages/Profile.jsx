import { 
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CloseButton,
  Heading,
  ChakraProvider,
  Flex,
  Icon,
  extendTheme,
  Stack,
  StackDivider,
  Spacer,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  IconButton,
  } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons"
import { FaUserTie, FaPenFancy } from "react-icons/fa"
import { NavLink } from "react-router-dom";
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
let fname, sname, email, current_bal;

fname="Manoj"
sname="Manikandan"
email="hello"

export default function Profile() {

  return(
    <ChakraProvider theme={theme} >
      <Flex align="center" p="15%">
        <Card borderWidth="1px"
                borderRadius="lg"
                w="100%"
                p={4}
                boxShadow="md"
                textAlign="center">
          
          <CardHeader>
            <Flex p={5}>
              <NavLink to="/dashboard">
                <IconButton
                aria-label="Go Back" 
                variant="ghost"
                colorScheme="blue"
                justify="flex-start" 
                fontSize="20px"
                icon={<ArrowBackIcon />}/>
              </NavLink>
              <Spacer />
              <Heading  size="xl" fontFamily="Futura" colorScheme="brand"> Profile </Heading>
              <Spacer />
              <IconButton
                justify="flex-end"
                variant="ghost"
                colorScheme="blue"
                aria-label="Edit profile"
                fontSize="20px"
                icon={<Icon as={FaPenFancy} />}
              />
            </Flex>
            <br></br>
            <Avatar size="lg" bg="blue.300" icon={<Icon as={FaUserTie}/>} p={10}/>
            <Heading size="md" fontFamily="Futura" colorScheme="brand" textTransform="uppercase" p={4}> {fname+" "+sname} </Heading>
          </CardHeader>

          <CardBody >
            <Stack divider={<StackDivider />} spacing='4'>
                <Text size="sm" fontFamily="Futura" colorScheme="brand"> Email: {email} </Text>
                
            </Stack>
          </CardBody>

        </Card>
      </Flex>
      
    </ChakraProvider>
  )
  
}
