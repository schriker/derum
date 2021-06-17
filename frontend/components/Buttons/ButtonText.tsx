import { Button, ButtonProps, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useClasses = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 0,
    fontWeight: 700,
    padding: '5px 10px',
    textTransform: 'initial',
    color: theme.palette.text.primary,
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

export const ButtonText = React.forwardRef((props: ButtonProps, ref) => {
  const classes = useClasses();

  return (
    <Button innerRef={ref} disableElevation classes={classes} {...props}>
      {props.children}
    </Button>
  );
});

ButtonText.displayName = 'ButtonText';
