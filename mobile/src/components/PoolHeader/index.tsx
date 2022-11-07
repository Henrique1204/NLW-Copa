import React from 'react';

import { Heading, HStack, Text, VStack } from 'native-base';

import { IPoolData } from '../PoolCard';
import Participants from '../Participants';

interface IPoolHeaderProps {
  data: IPoolData;
}

const PoolHeader: React.IComponent<IPoolHeaderProps> = ({ data }) => {
  return (
    <HStack
      w="full"
      h={20}
      bgColor="transparent"
      borderBottomWidth={1}
      borderBottomColor="gray.600"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      p={4}
    >
      <VStack>
        <Heading color="white" fontSize="md" fontFamily="heading">
          {data.title}
        </Heading>

        <HStack>
          <Text color="gray.200" fontSize="xs" mr={1}>
            Código:
          </Text>

          <Text color="gray.200" fontSize="xs" fontFamily="heading">
            {data.code}
          </Text>
        </HStack>
      </VStack>

      <Participants
        count={data._count?.participants}
        participants={data.participants}
      />
    </HStack>
  );
};

export default PoolHeader;
