import React from 'react';

import { AuthContext, IAuthContextDataProps } from '../../contexts/AuthContext';

type IUseAuthFn = () => IAuthContextDataProps;

const useAuth: IUseAuthFn = () => {
    const context = React.useContext(AuthContext)

    return context;
};

export default useAuth;
