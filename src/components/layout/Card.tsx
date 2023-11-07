import React from 'react';
import Box from './Box';
import cn from '@/utils/cn';

const Card = ({
  children,
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  className = cn(['p-2 rounded shadow-lg', className]);
  return (
    <Box className={className} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
