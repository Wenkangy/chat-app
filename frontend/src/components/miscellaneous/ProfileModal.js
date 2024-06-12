import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}
            
        <Modal  isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent height={"410px"}>
                <ModalHeader 
                    fontSize={"40px"}
                    fontFamily={"Work Sans"}
                    display="flex"
                    justifyContent={"center"}
                >
                    {user.name}
                </ModalHeader>
                 <ModalCloseButton />
                <ModalBody
                    display={"flex"}
                    flexDir={"column"}
                    alignItems="center"
                    justifyContent={"space-between"}
                >
                    <Image 
                        borderRadius={"full"}
                        boxSize={"150px"}
                         src={user.pic}
                        alt={user.name}
                        
                    />
                <Text fontSize="2xl" fontFamily="Work sans">
                    Email: {user.email}
                </Text>
           
                </ModalBody>
           
                <ModalFooter>
                    <Button   Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
         
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};



export default ProfileModal;
