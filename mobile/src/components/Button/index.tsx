import React from 'react';

import { Button as ButtonNB, IButtonProps as IButtonNBProps, Text } from 'native-base';

interface IButtonProps extends IButtonNBProps {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

const Button: React.IComponent<IButtonProps> = ({ title, type = "PRIMARY", ...props }) => {
    return (
        <ButtonNB
            w="full"
            h={14}
            rounded="sm"
            fontSize="md"
            bg={type === "SECONDARY" ? 'red.500' : 'yellow.500'}
            _pressed={{
                bg: type === "SECONDARY" ? 'red.600' : 'yellow.600',
            }}
            {...props}
        >
            <Text
                textTransform="uppercase"
                rounded="sm"
                fontFamily="heading"
                fontSize="md"
                color={type === "SECONDARY" ? 'white' : 'black'}
            >
                {title}
            </Text>
        </ButtonNB>
    );
};

export default Button;
