import { Box, makeStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  content: {
    flex: '1 1 auto',
    marginLeft: theme.spacing(2),
  },
}));

const EntiresItemLoading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Skeleton variant="rect" width={195} height={120} />
      <Box className={classes.content}>
        <Skeleton />
        <Skeleton height={50} />
        <Skeleton />
      </Box>
    </Box>
  );
};

export default EntiresItemLoading;
