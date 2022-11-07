import React from 'react';

import { Center, Spinner } from 'native-base';

const Loading: React.IComponent = () => {
    return (
        <Center flex={1} bg="gray.900">
            <Spinner color="yellow.500" />
        </Center>
    );
};

export default Loading;
