import React from 'react';
import { Fontisto } from '@expo/vector-icons';

import { Center, Icon, Text } from 'native-base';

import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button';

import Logo  from '../../assets/logo.svg';

const SignIn: React.IComponent = () => {
  const { signIn } = useAuth();

  return (
      <Center flex={1} bgColor="gray.900" p={7}>
        <Logo width={212} height={40} />

        <Button
          type="SECONDARY"
          title="Entrar com google"
          mt="12"
          leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
          onPress={signIn}
        />

        <Text color="white" textAlign="center" mt="4">
          Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação de sua conta.
        </Text>
      </Center>
  );
}

export default SignIn;
