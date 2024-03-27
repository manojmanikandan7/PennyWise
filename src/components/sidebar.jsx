import { List, ListItem, ListIcon, Divider } from "@chakra-ui/react";
import { SettingsIcon, CalendarIcon, AddIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List color="white" spacing={4}>
      <ListItem>
        <NavLink to="/">
          <ListIcon as={SettingsIcon} color="white" />
          Developer Dashboard
        </NavLink>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <NavLink to="/calendar">
          <ListIcon as={CalendarIcon} color="white" />
          Calendar
        </NavLink>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <NavLink to="/addTransaction">
          <ListIcon as={AddIcon} color="white" />
          Add Transaction
        </NavLink>
      </ListItem>
    </List>
  );
}
