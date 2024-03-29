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
import RemoveTransactionModal from "./removeTransactionModal";
import EditTransactionModal from "./editTransactionModal";

export default function Sidebar() {
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
      {/* Calendar Link */}
      <ListItem>
        <NavLink to="/calendar">
          <ListIcon as={CalendarIcon} color="white" fontSize="xl" />
          Calendar
        </NavLink>
      </ListItem>
      <Divider></Divider>
      {/* Add Transaction Form */}
      <ListItem>
        <AddTransactionModal />
      </ListItem>
      <Divider></Divider>
      {/* Remove Transaction Form */}
      <ListItem>
        <RemoveTransactionModal />
      </ListItem>
      <Divider></Divider>
      {/* Edit Transaction Form */}
      <ListItem>
        <EditTransactionModal />
      </ListItem>
      <Divider></Divider>
      {/* Settings Page */}
      <ListItem>
        <NavLink to="/settings">
          <ListIcon as={SettingsIcon} color="white" fontSize="xl" />
          Settings
        </NavLink>
      </ListItem>
      <Divider></Divider>
      {/* Profile Page */}
      <ListItem>
        <NavLink to="/profile">
          <ListIcon as={RxAvatar} color="white" fontSize="2xl" />
          Manage Profile
        </NavLink>
      </ListItem>
    </List>
  );
}
