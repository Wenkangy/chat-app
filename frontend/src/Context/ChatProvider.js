import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory  } from 'react-router-dom';


const ChatContex = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useState();
    const history = useHistory ();
    const [notification, setNotification] = useState([]);
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
    return (
        <ChatContex.Provider value = {{user,setUser,selectedChat, setSelectedChat,chats, setChats,notification, setNotification }}
        >{children}</ChatContex.Provider>
    )
}

export const ChatState =()=>{
    return useContext(ChatContex);
}


export default ChatProvider