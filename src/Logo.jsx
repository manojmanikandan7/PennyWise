/* eslint-disable no-unused-vars */
import React from "react";
import { Icon, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = (props) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return <Icon as={FaWallet} animation={animation} {...props} />;
};
