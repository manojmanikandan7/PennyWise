/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import {
  List,
  ListItem,
  ListIcon,
  Divider,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";

//Icons
import {
  SettingsIcon,
  CalendarIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

//Navigation
import { NavLink, useNavigate } from "react-router-dom";

//Transaction components
import AddTransactionModal from "./addTransactionModal";
import RemoveTransactionModal from "./removeTransactionModal";
import EditTransactionModal from "./editTransactionModal";

export default function Sidebar({ onTransactionChange, user_id }) {
  const navigate = useNavigate();
  const localUID = user_id;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <List color="white" spacing={4}>
      {/* Developer Dashboard Link */}
      <ListItem>
        <NavLink to="/">
          <ListIcon as={SettingsIcon} color="white" fontSize="xl" />
          Developer Dashboard
        </NavLink>
      </ListItem>
      <Divider></Divider>
      {/* Dashboard Link */}
      <ListItem>
          <Button
            onClick={() => navigate("/dashboard", { state: { user_id: localUID } })}
            leftIcon={<MdDashboard />}
            colorScheme="gray"
            variant="outline"
            width="150px"
            sx={{
              color: "white", // Default text color
              ".chakra-icon": {
                color: "white", // Default icon color
              },
              "&:hover": {
                bg: "white", //  hover background color change
                color: "black", //  hover text color change
                ".chakra-icon": {
                  color: "black", // hover icon color change
                },
              },
            }}
          >
            Dashboard
          </Button>
      </ListItem>
      <Divider></Divider>
      {/* Calendar Link */}
      <ListItem>
          <Button
            onClick={() => navigate("/calendar", { state: { user_id: localUID } })}
            leftIcon={<CalendarIcon />}
            colorScheme="gray"
            variant="outline"
            width="150px"
            sx={{
              color: "white", // Default text color
              ".chakra-icon": {
                color: "white", // Default icon color
              },
              "&:hover": {
                bg: "white", //  hover background color change
                color: "black", //  hover text color change
                ".chakra-icon": {
                  color: "black", // hover icon color change
                },
              },
            }}
          >
            Calendar
          </Button>
      </ListItem>
      <Divider></Divider>
      {/* Add Transaction Form */}
      <ListItem>
        <AddTransactionModal onTransactionChange={onTransactionChange} user_id={user_id} />
      </ListItem>
      <Divider></Divider>
      {/* Remove Transaction Form */}
      <ListItem>
        <RemoveTransactionModal onTransactionChange={onTransactionChange} user_id={user_id} />
      </ListItem>
      <Divider></Divider>
      {/* Edit Transaction Form */}
      <ListItem>
        <EditTransactionModal onTransactionChange={onTransactionChange} user_id={user_id} />
      </ListItem>
      <Divider></Divider>
      {/* Settings Page */}
      <ListItem>
        <NavLink to="/settings">
          <Button
            leftIcon={<SettingsIcon />}
            colorScheme="gray"
            width="150px"
            variant="outline"
            sx={{
              color: "white", // Default text color
              ".chakra-icon": {
                color: "white", // Default icon color
              },
              "&:hover": {
                bg: "white", //  hover background color change
                color: "black", //  hover text color change
                ".chakra-icon": {
                  color: "black", // hover icon color change
                },
              },
            }}
          >
            Settings
          </Button>
        </NavLink>
      </ListItem>
      <Divider></Divider>
      {/* Profile Page */}
      <ListItem>
        <NavLink to="/profile">
          <Button
            leftIcon={<CgProfile size="20px" />}
            colorScheme="gray"
            variant="outline"
            width="150px"
            sx={{
              color: "white", // Default text color
              ".chakra-icon": {
                color: "white", // Default icon color
              },
              "&:hover": {
                bg: "white", //  hover background color change
                color: "black", //  hover text color change
                ".chakra-icon": {
                  color: "black", // hover icon color change
                },
              },
            }}
          >
            Profile
          </Button>
        </NavLink>
      </ListItem>
    </List>
  );
}
