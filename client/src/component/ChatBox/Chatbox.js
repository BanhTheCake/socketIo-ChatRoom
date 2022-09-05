import { Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chatbox = ({ messages, user }) => {

    const [message, setMessage] = useState('')

    console.log(messages);

    const handleClick = (e) => {
        socket.emit('sendMessage', {username: user.username, room: user.room, message})
        setMessage('')
    }

    const handleEnter = (e) => {
        if (e.code === 'Enter') {
            socket.emit('sendMessage', {username: user.username, room: user.room, message})
            setMessage('')
        }
        return;
    }
    
    return (
        <VStack w="400px" spacing="0" py='2'>
            <Box
                sx={{ borderRadius: '4px 4px 0 0' }}
                bg="blue.600"
                color="white"
                w="full"
            >
                <Text p="3">{user.username}</Text>
            </Box>
            <VStack
                as={ScrollToBottom}
                bg="white"
                h="300px"
                overflowY="auto"
                w="full"
                alignItems="flex-start"
                mode='bottom'
            >
                {messages &&
                    messages?.map((message) => {
                        return (
                           <Box maxW="65%"
                                w="fit-content"
                                m='2'
                                sx={message.user === user.username ? { marginLeft: 'auto !important' } : {}}>
                           <Text
                                px="3"
                                py="1"
                                bg="gray.200"
                                borderRadius="base"
                                whiteSpace="pre-wrap"
                            >
                                {message.message}
                            </Text>
                            <Text
                            fontSize='small'
                            fontWeight='semibold'
                            px='1'
                            sx={message.user === user.username ? { textAlign: 'right !important' } : {}}
                            >
                                {message.user}
                            </Text>
                           </Box>
                        );
                    })}
            </VStack>
            <HStack bg="white" p={2} w="full">
                <Input
                    w="full"
                    borderColor="black"
                    borderWidth="medium"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <Button onClick={handleClick} colorScheme="blue">Send</Button>
            </HStack>
        </VStack>
    );
};

export default Chatbox;
