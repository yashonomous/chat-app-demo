import { Spinner, SpinnerProps } from '@primer/react';
import { FC, forwardRef } from 'react';
import { Box } from 'rebass';

const Loader: FC<SpinnerProps> = forwardRef(({ sx, size }, ref) => {
  return (
    <Box ref={ref}>
      <Spinner sx={sx} size={size} />
    </Box>
  );
});

export default Loader;
