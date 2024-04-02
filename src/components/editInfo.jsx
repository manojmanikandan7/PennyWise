/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import {
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Icon,
} from "@chakra-ui/react";

//Icons
import { FaPenFancy } from "react-icons/fa";

import axios from "axios";

export default function EditInfo(fn, sn, e, updateInfo) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO: Change this to the UID of the user logged in
  const id = 2;
  const [fname, setFname] = useState(fn);
  const [sname, setSname] = useState(sn);
  const [email, setEmail] = useState(e);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/editInfo", {
      fname,
      sname,
      email,
      password,
    });

    // Reset the form fields
    setFname("");
    setSname("");
    setEmail("");
    setPassword("");

    // Call the onTransactionSubmit callback to notify the parent component
    updateInfo();

    // Close the modal
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<Icon as={FaPenFancy} />}
        variant="ghost"
        colorScheme="blue"
        aria-label="Edit profile"
        fontSize="20px"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Sur Name</FormLabel>
              <Input
                placeholder="Sur name"
                value={sname}
                onChange={(e) => setSname(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="green" onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
