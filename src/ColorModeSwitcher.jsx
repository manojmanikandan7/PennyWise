/* eslint-disable no-unused-vars */
import React from "react";
import { useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("Dark Mode", "Light Mode");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      leftIcon={<SwitchIcon />}
      p={4}
      {...props}
    >
      {text}
      </Button>
  );
};
