import React from 'react';

import { Image, IImageProps } from 'native-base';

const Flag: React.IComponent<IImageProps> = (props) => {
  return (
    <Image
      {...props}
      alt="Bandeira"
      w={8}
      h={6}
      mx={3}
    />
  );
};

export default Flag;
