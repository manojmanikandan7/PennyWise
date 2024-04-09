
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import EditInfo from "../components/editInfo";
import axios from "axios";
import { useState } from "react";

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

export default function Profile() {
  let location = useLocation();
  const user_id = location.state.user_id;

  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");

  const getData = async () => {
    const fetchedData = await axios.post("http://localhost:3000/getInfo", {
        uid: user_id
    });

    setFname(fetchedData.data[0]);
    setSname(fetchedData.data[1]);
    setEmail(fetchedData.data[2]);
  }

  const [refreshData, setRefreshData] = useState(0);

  // Function to toggle the refresh state
  const refreshInfo = () => {
    setRefreshData((prev) => prev + 1);
  };

  getData(); //to be called when the page loads
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
                <GridItem colStart={2} colEnd={5} align="center">
                  <Heading size="xl" color="teal">
                    {" "}
                    Profile{" "}
                  </Heading>
                </GridItem>

                <GridItem colSpan={1} align="right">
                  <EditInfo
                    uid={user_id}
                    fn={fname.toString()}
                    sn={sname.toString()}
                    e={email.toString()}
                    refreshInfo={refreshInfo}
                  />
                </GridItem>
              </Grid>
              <br></br>
              <Avatar
                size="lg"
                name={fname + ' ' + sname}
                p={10}
              />
              <Heading
                size="md"
                textTransform="uppercase"
                p={4}
              >
                {" "}
                {fname + " " + sname}{" "}
              </Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4"  p={8}>
                <Text as='b' size="md" color="teal">
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
