import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import useAuth from '../hooks/useAuth';

import AppRoutes from './app.routes';

import SignIn from '../screens/SignIn';

const Routes: React.IComponent = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {!!user.name ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    );
};

export default Routes;
