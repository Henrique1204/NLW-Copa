import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { VStack, Icon } from 'native-base';

import Header from '../../components/Header';
import Button from '../../components/Button';

const Pools: React.IComponent = () => {
    const { navigate } = useNavigation();

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />

            <VStack
                mt="6"
                mx="5"
                borderBottomWidth="1"
                pb="4"
                mb="4"
                borderBottomColor="gray.600"
            >
                <Button
                    title="Buscar bolão por código"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    onPress={() => navigate('searchPool')}
                />
            </VStack>
        </VStack>
    );
};

export default Pools;
