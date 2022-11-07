import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NativeBaseProvider, StatusBar } from 'native-base';

import { THEME } from './src/styles/theme';

import Loading from './src/components/Loading';
import SignIn from './src/screens/SignIn';

const App: React.FC = () => {
  const [fontsLodaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />

      {fontsLodaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
};

export default App;
