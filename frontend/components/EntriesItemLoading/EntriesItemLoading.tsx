import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const EntiresItemLoading = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      bgcolor="background.paper"
      borderRadius={3}
      p={2}
    >
      <Skeleton variant="rect" width={220} height={120} />
      <Box ml={2} flex="1 1 auto">
        <Skeleton />
        <Skeleton height={50} />
        <Skeleton />
      </Box>
    </Box>
  );
};

export default EntiresItemLoading;
