import { Box, BoxProps } from '@primer/react';

import React from 'react';

interface BoxWrapperProps extends BoxProps {
  children: React.ReactNode;
}

const BoxWrapper: React.FC<BoxWrapperProps> = ({ children, ...props }: BoxWrapperProps) => {
  return <Box {...props}>{children}</Box>;
};

export default BoxWrapper;
