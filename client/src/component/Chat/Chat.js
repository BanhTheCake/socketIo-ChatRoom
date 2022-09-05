import { Center, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import socket from "../../socket/socket";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import Chatbox from "../ChatBox/Chatbox";
import InfoBox from "../InfoBox/InfoBox";

const Chat = () => {

    const [messages, setMessages] = useState([])
    const [userList, setUserList] = useState([])
    const location = useLocation()

    useEffect(() => {
        socket.connect()
        const {username, room} = queryString.parse(location.search);
        socket.emit('joinRoom', { username, room })
        socket.emit('roomIn', {username, room})
        
    }, [location])

    useEffect(() => {
        socket.on('roomData', (data) => {
            console.log('data: ', data);
            setUserList(data.userList)
        })
        socket.on('message', (data) => {
            setMessages(prev => [...prev, data])
        })
        socket.on('connect_error', (err) => {
            console.log(err);
        })
        return () => {
            socket.off('roomData')
            socket.off('message')
            socket.off('connect_error')
        }
    }, [])


  return <Center h='100vh' bg='gray.900'>
    <HStack alignItems='flex-start'>
        <VStack>
            <Chatbox messages={messages} user={queryString.parse(location.search)} />
        </VStack>
        <VStack>
            <InfoBox userList={userList} />
        </VStack>
    </HStack>
  </Center>;
};

export default Chat;
