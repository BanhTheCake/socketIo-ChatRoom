import { Circle, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const InfoBox = ({ userList }) => {

  return (
      <VStack
          color="white"
          alignItems="flex-start"
          fontSize="2xl"
          justifyContent="flex-start"
          p="10"
      >
          <Text fontWeight="semibold">Realtime Chat Application 💬</Text>
          <Text fontWeight="semibold">
              Created with React, Express, Node and Socket.IO ❤️
          </Text>
          <Text>People currently chatting :</Text>
          {userList &&
              userList.map((user) => {
                {console.log(user)}
                  return (
                      <HStack key={user.id}>
                          <Circle mb="-1" size="15px" bg="whatsapp.400" />
                          <Text>{user.username}</Text>
                      </HStack>
                  );
              })}
      </VStack>
  );
};

export default InfoBox;
