import {
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  extendTheme,
  Text,
} from "@chakra-ui/react";
import { NavLink , useLocation} from "react-router-dom";

import Sidebar from "../components/sidebar";
import AddUpcomingBillsModal from "../components/addUpcomingBills";
import EditUpcomingBillsModal from "../components/editUpcomingBills";
import RemoveUpcomingBillsModal from "../components/removeUpcomingBills";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

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


export default function Settings() {
  let location = useLocation();
  const user_id = location.state.user_id;

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
          <Sidebar user_id={user_id}/>
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
                <GridItem colSpan={5}>
                  <Heading size="xl" color="red.500">
                    {" "}
                    Settings{" "}
                  </Heading>
                </GridItem>
                
              </Grid>
            </CardHeader>

            <CardBody>
              
              <Stack divider={<StackDivider />} spacing="4" align="center">
                <Text as="b" colorScheme="grey" alignSelf="left">Customise Upcoming Bills</Text>
                <AddUpcomingBillsModal user_id={user_id}/>
                <EditUpcomingBillsModal user_id={user_id} />
                <RemoveUpcomingBillsModal user_id={user_id} />
                <Text as="b" colorScheme="grey" alignSelf="left">Switch Color Theme</Text>
                <ColorModeSwitcher />
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}