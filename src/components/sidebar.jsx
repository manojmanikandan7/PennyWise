import { List, ListItem, ListIcon, Divider } from "@chakra-ui/react";
import {
  SettingsIcon,
  CalendarIcon,
  AddIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

export default function Sidebar() {
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
        <NavLink to="/addTransaction">
          <ListIcon as={AddIcon} color="white" fontSize="xl" />
          Add Transaction
        </NavLink>
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
