import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const ChatMessagesSkeleton = () => {
  return (
    <Box
      flex="1 1 auto"
      overflow="auto"
      pr={2}
      pt={2}
      maxHeight="calc(100% - 70px)"
    >
      <Skeleton height={30} />
      <Skeleton height={30} width="80%" />
      <Skeleton height={30} />
    </Box>
  );
};

export default ChatMessagesSkeleton;
