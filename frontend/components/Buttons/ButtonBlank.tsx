import { Button, ButtonProps, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useClasses = makeStyles((theme: Theme) => ({
  root: {
    fontWeight: 700,
    textTransform: 'initial',
    color: theme.palette.text.primary,
    padding: '5px 20px',
    '&:hover': {},
    '&$disabled': {
      backgroundColor: theme.palette.grey.A400,
      '&:hover': {
        backgroundColor: theme.palette.grey.A400,
      },
    },
  },
  disabled: {
    backgroundColor: theme.palette.grey.A400,
    '&:hover': {
      backgroundColor: theme.palette.grey.A400,
    },
  },
}));

export const ButtonBlank = React.forwardRef((props: ButtonProps, ref) => {
  const classes = useClasses();

  return (
    <Button innerRef={ref} disableElevation classes={classes} {...props}>
      {props.children}
    </Button>
  );
});
