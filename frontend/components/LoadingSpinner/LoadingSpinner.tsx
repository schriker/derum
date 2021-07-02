import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <Box
      top="0"
      left="0"
      position="absolute"
      zIndex="999"
      borderRadius={3}
      bgcolor="rgba(0,0,0, 0.5)"
      width="100%"
      height="100%"
    >
      <Box
        top="50%"
        left="50%"
        position="absolute"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <CircularProgress color="secondary" />
      </Box>
    </Box>
  );
};

export default LoadingSpinner;
