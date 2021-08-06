import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import ErrorIcon from '../Icons/ErrorIcon';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginRight: 5,
  },
}));

const EntriesEmpty = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.icon} variant="h5" color="textSecondary">
        <ErrorIcon />
      </Typography>
      <Typography variant="h5" color="textSecondary">
        Brak wpisów
      </Typography>
    </Box>
  );
};

export default EntriesEmpty;
