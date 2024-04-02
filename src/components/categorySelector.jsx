import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Box,
  Portal,
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
    setSelectedCategory(category);
    onSelect(category);
  };

  const IconComponent = selectedCategory
    ? categories[selectedCategory].icon
    : FaMoneyBillWave;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<IconComponent />}>
        {selectedCategory || "Select Category"}
      </MenuButton>
      <Portal>
        <MenuList zIndex={1500}>
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
      </Portal>
    </Menu>
  );
};

export default CategorySelector;
