import React from 'react';

import { Text, HStack, Box } from 'native-base';
import { CaretLeft, Export } from 'phosphor-react-native';

import ButtonIcon from '../ButtonIcon';

interface IHeaderProps {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
}

const EmptyBoxSpace = () => (<Box w={6} h={6} />);

const Header: React.IComponent<IHeaderProps> = ({ title, showBackButton = false, showShareButton = false }) => {
  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {
          showBackButton
            ? <ButtonIcon icon={CaretLeft} />
            : <EmptyBoxSpace />
        }

        <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
          {title}
        </Text>

        {
          showShareButton
            ?
            <ButtonIcon icon={Export} />
            :
            <EmptyBoxSpace />
        }
      </HStack>
    </HStack>
  );
};

export default Header;
