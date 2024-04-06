
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
  Stack,
  StackDivider,
  Text,
  extendTheme,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import Sidebar from "../components/sidebar";
import AddUpcomingBillsModal from "../components/addUpcomingBills";
import EditUpcomingBillsModal from "../components/editUpcomingBills";


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

export default function Settings(){
  
  function updateBills( bills ){
    //Doesn't work since this is frontend
    /* fs.writeFileSync("../assets/testDataUpcomingBills.json", JSON.stringify(bills), function(err) {
      if (err) {
        console.log(err);
      }
    }); */
    console.log(JSON.stringify(bills));
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
                  <Grid templateColumns='repeat(5, 1fr)' p={5}>
                    <GridItem colSpan={1} align="left">
                      <NavLink to="/dashboard">
                        <IconButton
                          aria-label="Go Back"
                          variant="ghost"
                          colorScheme="red"
                          
                          fontSize="20px"
                          icon={<ArrowBackIcon />}
                        />
                      </NavLink>

                    </GridItem>
                    
                    <GridItem colSpan={3}>
                      <Heading size="xl" fontFamily="Futura" colorScheme="brand">
                        {" "}
                        Settings{" "}
                      </Heading>

                    </GridItem>
                    
                  </Grid>
                  <br></br>
                </CardHeader>
    
                <CardBody >
                  <Stack divider={<StackDivider />} spacing="4" align="center">
                    <AddUpcomingBillsModal updateBills={updateBills}/>
                    <EditUpcomingBillsModal updateBills={updateBills}/>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </ChakraProvider>
      );
}