import { Box, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  contentWrapper: {
    flex: '1 1 calc(100% - 60px)',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1),
    overflowY: 'auto',
  },
}));

const EntriesWrapper = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();

  return (
    <Box className={`scrollbar ${classes.contentWrapper}`}>{children}</Box>
  );
};

export default EntriesWrapper;
