/* eslint-disable no-unused-vars */
import {
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  Button,
  Icon,
  Avatar,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import axios from "axios";

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object,
  user_id: PropTypes.number,
};

export default function Navbar({ title, icon, user_id }) {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const data = await axios.post("http://localhost:3000/getInfo", {
      uid: user_id
    });

    const fname = data.data[0];
    const sname = data.data[1];
    const email = data.data[2];

    setUserInfo({
      "fname": fname,
      "sname": sname,
      "email": email,
    });
  }
  
  getUserInfo();

  return (
    <Flex as="nav" p="10px" alignItems="center">
      <HStack>
        <Icon as={icon} w="10" h="20"></Icon>
        <Heading as="h3" fontSize="37">
          {title}
        </Heading>
      </HStack>
      <Spacer />

      <HStack spacing="20px">
        <Avatar
          size="lg"
          name={userInfo.fname + ' ' + userInfo.sname}
        />
        <Text>{userInfo.fname} {userInfo.sname} ({userInfo.email})</Text>
        <Button
          color="#DD3333"
          colorScheme="#00FF00"
          variant="outline"
          onClick={() => navigate("/login", { state: { user_id: -1 }})}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
