/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

//Icons
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

// Define categories with their respective icons
const categories = {
  Transportation: { icon: FaCar },
  Food: { icon: FaHamburger },
  "Groceries & Laundry": { icon: FaShoppingBasket },
  Subscriptions: { icon: FaCalendarCheck },
  Savings: { icon: FaPiggyBank },
  Other: { icon: FaMoneyBillWave },
  Entertainment: { icon: FaFilm },
  Education: { icon: FaBook },
  "Health & Fitness": { icon: FaDumbbell },
  Electronics: { icon: FaMobileAlt },
  Utilities: { icon: FaBolt },
  Housing: { icon: FaHome },
};

const CategorySelector = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (category) => {
    setSelectedCategory(category); // Set the selected category in the state
    onSelect(category); // Pass the selected category up to the parent component
  };

  const IconComponent = selectedCategory
    ? categories[selectedCategory].icon
    : FaMoneyBillWave;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<IconComponent />}>
        {selectedCategory || "Select Category"}
      </MenuButton>
      <MenuList>
        {Object.entries(categories).map(([category, { icon: Icon }]) => (
          <MenuItem
            key={category}
            minH="40px"
            onClick={() => handleSelect(category)}
          >
            <Flex align="center">
              <Icon w={5} h={5} />
              <Box pl={3}>{category}</Box>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
