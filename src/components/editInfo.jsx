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
import { stringify } from "uuid";

export default function EditInfo({ uid, fn, sn, e, refreshInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    //To update the info edited by the user.
    await axios.post("http://localhost:3000/editInfo", {
      uid,
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

    // Call the updateInfo callback to notify the parent component
    refreshInfo();

    // Close the modal
    onClose();
  };

  const openAndFillInputs = () => {
    setFname(fn);
    setSname(sn);
    setEmail(e);

    onOpen();
  }

  return (
    <>
      <IconButton
        onClick={openAndFillInputs}
        icon={<Icon as={FaPenFancy} />}
        variant="ghost"
        colorScheme="blue.800"
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
              <FormLabel>Firstname</FormLabel>
              <Input
                placeholder="Firstname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Surname</FormLabel>
              <Input
                placeholder="Surname"
                value={sname}
                onChange={(e) => setSname(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button color="blue.800" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button color="green.400" onClick={handleSubmit}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
