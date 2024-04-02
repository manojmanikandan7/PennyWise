import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Spacer,
  Stack,
  StackDivider,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import { FaUserTie } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/sidebar";
import EditInfo from "../components/editInfo";
import axios from "axios";

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
let fname, sname, email;

fname = "John";
sname = "Doe";
email = "hello@sample.com";

export default function Profile() {
  function getData() {
    /*const fetchedData = async () => {
      axios.get("http://localhost:3000/getInfo"), email;
    };
    fname = fetchedData[0];
    sname = fetchedData[1];*/
    console.log("worked");
  }
  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.25">
        <GridItem
          align="aside"
          colSpan={1}
          bg="black"
          minHeight="100vh"
          p="30px"
        >
          <Sidebar />
        </GridItem>

        <GridItem align="center" p="15%" colSpan={7}>
          <Card
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
            p={4}
            boxShadow="md"
            textAlign="center"
          >
            <CardHeader>
              <Flex p={5}>
                <NavLink to="/dashboard">
                  <IconButton
                    aria-label="Go Back"
                    variant="ghost"
                    colorScheme="blue"
                    justify="flex-start"
                    fontSize="20px"
                    icon={<ArrowBackIcon />}
                  />
                </NavLink>
                <Spacer />
                <Heading size="xl" fontFamily="Futura" colorScheme="brand">
                  {" "}
                  Profile{" "}
                </Heading>
                <Spacer />
                <EditInfo
                  fn={fname}
                  sn={sname}
                  e={email}
                  refreshInfo={getData}
                />
              </Flex>
              <br></br>
              <Avatar
                size="lg"
                bg="blue.300"
                icon={<Icon as={FaUserTie} />}
                p={10}
              />
              <Heading
                size="md"
                fontFamily="Futura"
                colorScheme="brand"
                textTransform="uppercase"
                p={4}
              >
                {" "}
                {fname + " " + sname}{" "}
              </Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Text size="md" fontFamily="Futura" colorScheme="brand">
                  {" "}
                  Email: {email}{" "}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
