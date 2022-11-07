import React from 'react';

import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NativeBaseProvider, StatusBar } from 'native-base';

import { THEME } from './src/styles/theme';

import { AuthContextProvider } from './src/contexts/AuthContext';

import Loading from './src/components/Loading';
import SearchPool from './src/screens/SearchPool';

const App: React.IComponent = () => {
  const [fontsLodaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
        />

        {fontsLodaded ? <SearchPool /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
