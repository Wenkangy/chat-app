import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios';
import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar } from '@chakra-ui/react'
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory  } from "react-router";
import { useDisclosure } from "@chakra-ui/hooks";
import { Spinner } from "@chakra-ui/spinner";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";

const SideDrawer = () => {
 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    
    const {user, setSelectedChat, chats, setChats, notification, setNotification} = ChatState();

    const history = useHistory ();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };
    
    const toast = useToast();
    const handleSearch = async() => {
        if(!search){
            toast ({
                title:"Enter Something to search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"top-left",

            });
            return;
                
        }
        try{
            setLoading(true);
            const config ={
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const{data} = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false);
            setSearchResult(data)
        }catch(error){
            toast ({
                title:"Error Ocurred!",
                status: "Failed to Load The Search Results",
                duration: 5000,
                isClosable: true,
                position:"bottom-left",

            });
        }
    }

    const accessChat = async (userId) => {
        console.log(userId);
        try {
            setLoadingChat(true);
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.post("/api/chat", { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        }catch(error){
            toast ({
                title:"Error fetching chat!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom-left",

            });
        }
    };

    return (
        <>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            width="100%"
            padding="5px 10px"
            borderWidth="5px"
        >
            <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                    <i className="fas fa-search"></i>
                    <Text display={{ base: "none", md: "flex" }} marginLeft="4px">
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
                Talk
            </Text>
            <div>
                <Menu>
                    <MenuButton>
                        <BellIcon fontSize="2xl" />
                    </MenuButton>
                    <MenuList pl={2}>
                        {!notification.length && "No New Messages"}
                        {notification.map((notif) => (
                        <MenuItem
                            key={notif._id}
                            onClick={() => {
                            setSelectedChat(notif.chat);
                            setNotification(notification.filter((n) => n !== notif));
                            }}
                        >
                        {notif.chat.isGroupChat? `New Message in ${notif.chat.chatName}`: `New Message from ${getSender(user, notif.chat.users)}`}
                    </MenuItem>
                    ))}
                </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user= {user}>
                        <MenuItem>My Profile</MenuItem>{" "}
                        </ProfileModal>
                       
                        <MenuDivider/>
                        <MenuItem onClick={logoutHandler}>logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={"1px"}>search users</DrawerHeader>
                <DrawerBody>
                    <Box display ="flex" pb={2}>
                        <Input
                        placeholder="search by name or email"
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearch}
                        >
                            Go
                        </Button>
                    </Box>
                    {loading ? <ChatLoading/> : 
                    (
                        searchResult?.map((user) => (
                            <UserListItem
                              key={user._id}
                              user={user}
                              handleFunction={() => accessChat(user._id)}
                            />
                          ))
                    )}
                    {loadingChat && <Spinner ml ="auto" display = "flex"/>}
                </DrawerBody> 
                </DrawerContent>
                
            </DrawerOverlay>
        </Drawer>

        </>

    )
}

export default SideDrawer;
