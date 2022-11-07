import React from "react";

export interface IUserProps {
    name: string;
    avatarUrl: string;
}

export interface IAuthContextDataProps {
    user: IUserProps;
    signIn: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContextDataProps>({} as IAuthContextDataProps);

export const AuthContextProvider: React.IComponent = ({ children }) => {
    const [user, setUser] = React.useState<IUserProps>({
        name: 'Henrique',
        avatarUrl: 'https://github.com/henrique1204.png',
    });

    const signIn = async () => {};

    return (
        <AuthContext.Provider value={{ signIn, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
