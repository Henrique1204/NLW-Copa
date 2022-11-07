import React from 'react';

import { Center, Text, Pressable, IPressableProps } from 'native-base';

interface IOptionProps extends IPressableProps {
  title: string;
  isSelected: boolean;
}

const Option: React.IComponent<IOptionProps> = ({ title, isSelected = false, ...props }) => {
  return (
    <Pressable flex={1} h={7} maxH={7} {...props}>
      <Center h="full" w="full" bgColor={isSelected ? "gray.600" : "transparent"} rounded="sm" >
        <Text color="gray.100" fontFamily="heading" fontSize="xs">
          {title}
        </Text>
      </Center>
    </Pressable>
  );
};