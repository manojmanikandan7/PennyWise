import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { SettingsIcon, ViewOffIcon } from "@chakra-ui/icons";
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
      <ListItem>
        <NavLink to="null">
          <ListIcon as={ViewOffIcon} color="white" />
          Page1
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="null">
          <ListIcon as={ViewOffIcon} color="white" />
          Page2
        </NavLink>
      </ListItem>
    </List>
  );
}
