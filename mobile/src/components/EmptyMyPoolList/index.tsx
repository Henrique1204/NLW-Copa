import React from 'react';
import { Row, Text, Pressable } from 'native-base';

interface IEmptyMyPoolListProps {
  code: string;
}

const EmptyMyPoolList: React.IComponent<IEmptyMyPoolListProps> = ({ code }) => {
  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        Esse bolão ainda não tem participantes, que tal 
      </Text>

      <Pressable onPress={() => {}}>
          <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
          compartilhar o código
          </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        do bolão com alguém?
      </Text>

      <Text color="gray.200" mr={1}>
        Use o código
      </Text>
      
      <Text color="gray.200" fontSize="sm" textAlign="center" fontFamily="heading"> 
        {code}
      </Text>
    </Row>
  );
};

export default EmptyMyPoolList;
