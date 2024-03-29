/* eslint-disable no-unused-vars */

import React from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  FaCar,
  FaHamburger,
  FaShoppingBasket,
  FaCalendarCheck,
  FaPiggyBank,
  FaMoneyBillWave,
  FaFilm,
  FaBook,
  FaDumbbell,
  FaMobileAlt,
  FaBolt,
  FaHome,
} from "react-icons/fa";

// Function to map category to its corresponding icon
const iconMapper = (category) => {
  const icons = {
    Transportation: <FaCar />,
    Food: <FaHamburger />,
    "Groceries And Laundry": <FaShoppingBasket />,
    Subscriptions: <FaCalendarCheck />,
    Savings: <FaPiggyBank />,
    Other: <FaMoneyBillWave />,
    Entertainment: <FaFilm />,
    Education: <FaBook />,
    "Health & Fitness": <FaDumbbell />,
    Electronics: <FaMobileAlt />,
    Utilities: <FaBolt />,
    Housing: <FaHome />,
  };
  return icons[category] || <Box />;
};

const CategorySelector = ({ onSelect }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaMoneyBillWave />}>
        Select Category
      </MenuButton>
      <MenuList>
        {Object.keys(iconMapper()).map((category) => (
          <MenuItem
            key={category}
            minH="48px"
            onClick={() => onSelect(category)}
          >
            <Box as="span" mr="12px">
              {iconMapper(category)}
            </Box>
            <span>{category}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
