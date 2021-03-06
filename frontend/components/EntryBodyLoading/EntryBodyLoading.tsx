import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const EntryBodyLoading = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      bgcolor="background.paper"
      borderRadius={10}
      p={2}
    >
      <Box flex="1 1 auto">
        <Skeleton />
        <Skeleton height={50} />
        <Skeleton />
      </Box>
    </Box>
  );
};

export default EntryBodyLoading;
