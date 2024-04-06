
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Stack,
  StackDivider,
  extendTheme,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { useState } from "react";

import Sidebar from "../components/sidebar";
import AddUpcomingBillsModal from "../components/addUpcomingBills";
import EditUpcomingBillsModal from "../components/editUpcomingBills";
import RemoveUpcomingBillsModal from "../components/removeUpcomingBills";
import { upcomingBills } from "../assets/testDataUpcomingBills.json";

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
  const [currentBills, setCurrentBills] = useState(upcomingBills);
  function updateBills( bills ){
    
    setCurrentBills(bills);
    console.log(JSON.stringify(currentBills));
    //Doesn't work since this is frontend
    /* fs.writeFileSync("../assets/testDataUpcomingBills.json", JSON.stringify(currentBills), function(err) {
      if (err) {
        console.log(err);
      }
    }); */
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
                      <Heading size="xl" fontFamily="Futura" color="red.500">
                        {" "}
                        Settings{" "}
                      </Heading>

                    </GridItem>
                    
                  </Grid>
                </CardHeader>
    
                <CardBody>
                  
                  <Stack divider={<StackDivider />} spacing="4" align="center">
                    <Text as="b" fontFamily="Futura" color="grey.200" alignSelf="left">Customise Upcoming Bills</Text>
                    <AddUpcomingBillsModal updateBills={updateBills} upcomingBills={currentBills}/>
                    <EditUpcomingBillsModal updateBills={updateBills} upcomingBills={currentBills}/>
                    <RemoveUpcomingBillsModal updateBills={updateBills} upcomingBills={currentBills}/>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </ChakraProvider>
      );
}