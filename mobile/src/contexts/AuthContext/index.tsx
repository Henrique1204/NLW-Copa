import React from 'react';

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { GOOGLE_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

export interface IUserProps {
    name: string;
    avatarUrl: string;
}

export interface IAuthContextDataProps {
    user: IUserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContextDataProps>({} as IAuthContextDataProps);

export const AuthContextProvider: React.IComponent = ({ children }) => {
    const [isUserLoading, setIsUserLoading] = React.useState<boolean>(false);

    const [user, setUser] = React.useState<IUserProps>({
        name: 'Henrique',
        avatarUrl: 'https://github.com/henrique1204.png',
    });

    const [_, response, promptAsync] = Google.useAuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email'],
    });

    const signIn = async () => {
        try {
            setIsUserLoading(true)

            await promptAsync();


        }
        catch (error) {
            console.error(error);

            throw error;
        }
        finally {
            setIsUserLoading(false);
        }
    };

    const signInWithGoogle = async (access_token: string) => {
        console.log('access_token', access_token);
    };

    React.useEffect(() => {
        if (response?.type === "success" && response?.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response])

    return (
        <AuthContext.Provider value={{ signIn, user, isUserLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
