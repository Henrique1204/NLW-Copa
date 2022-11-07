import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { useTheme } from "native-base";

import { IconProps } from "phosphor-react-native";

interface IButtonIconProps extends TouchableOpacityProps {
  icon: React.FC<IconProps>;
}

const ButtonIcon: React.IComponent<IButtonIconProps> = ({ icon: Icon, ...props }) => {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...props}>
      <Icon color={colors.gray[300]} size={sizes[6]} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
