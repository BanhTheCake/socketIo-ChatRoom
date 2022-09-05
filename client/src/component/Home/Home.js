import React, { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { Button, Center, Input, VStack } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [err, setErr] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        socket.connect()
    }, [])

    const handleClick = () => {
        if (!username || !room) {
            setErr('SomeThing is Missing !!')
            return
        };

        return navigate(`/chat?username=${username}&room=${room}`)

    }

    return (
        <Center h="100vh" bg='purple.600' color='white'>
            <VStack as="form">
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" focusBorderColor='black' value={username} 
                        onChange={(e) => {setUsername(e.target.value); setErr(null)}}
                    />
                </FormControl>
                <FormControl pb='4'>
                    <FormLabel>Room</FormLabel>
                    <Input type="text" focusBorderColor='black' value={room}
                        onChange={(e) => {setRoom(e.target.value); setErr(null)}}
                    />
                    <FormHelperText color='red.300'>
                    { err && err }
                    </FormHelperText>
                </FormControl>
                <Button colorScheme='blackAlpha' w='full'
                    onClick={handleClick}
                >Join Room</Button>
            </VStack>
        </Center>
    );
};

export default Home;
