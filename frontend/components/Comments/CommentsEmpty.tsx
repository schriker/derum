import { Box, Typography } from '@material-ui/core';
import React from 'react';

const CommentsEmpty = (): JSX.Element => {
  return (
    <Box textAlign="center" py={5}>
      <Typography color="textSecondary" variant="h5">
        Brak komentarzy
      </Typography>
    </Box>
  );
};

export default CommentsEmpty;
