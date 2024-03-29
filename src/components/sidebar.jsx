/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import {
  List,
  ListItem,
  ListIcon,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";

//Icons
import {
  SettingsIcon,
  CalendarIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { RxAvatar } from "react-icons/rx";

//Navigation
import { NavLink } from "react-router-dom";

//Transaction components
import AddTransactionModal from "./addTransactionModal";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <List color="white" spacing={4}>
      <ListItem>
        <NavLink to="/">
          <ListIcon as={SettingsIcon} color="white" fontSize="xl" />
          Developer Dashboard
        </NavLink>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <NavLink to="/calendar">
          <ListIcon as={CalendarIcon} color="white" fontSize="xl" />
          Calendar
        </NavLink>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <AddTransactionModal />
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <NavLink to="/removeTransaction">
          <ListIcon as={CloseIcon} color="white" fontSize="16" />
          Remove Transaction
        </NavLink>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <NavLink to="/editTransaction">
          <ListIcon as={EditIcon} color="white" fontSize="xl" />
          Edit Transaction
        </NavLink>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <NavLink to="/settings">
          <ListIcon as={SettingsIcon} color="white" fontSize="xl" />
          Settings
        </NavLink>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <NavLink to="/profile">
          <ListIcon as={RxAvatar} color="white" fontSize="2xl" />
          Manage Profile
        </NavLink>
      </ListItem>
    </List>
  );
}
