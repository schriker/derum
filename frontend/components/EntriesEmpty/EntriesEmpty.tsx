import { Box, Typography } from '@material-ui/core';
import React from 'react';
import ErrorIcon from '../Icons/ErrorIcon';

const EntriesEmpty = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      py={5}
      my="3px"
      flex="1 1 auto"
      bgcolor="background.paper"
    >
      <Typography variant="h5" color="textSecondary" style={{ marginRight: 5 }}>
        <ErrorIcon />
      </Typography>
      <Typography variant="h5" color="textSecondary">
        Brak wpisów
      </Typography>
    </Box>
  );
};

export default EntriesEmpty;
