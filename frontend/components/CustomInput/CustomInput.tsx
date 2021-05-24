import { withStyles, Theme, InputBase } from '@material-ui/core';

export const CustomInput = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    border: '2px solid',
    padding: '3px 15px',
    borderColor: 'transparent',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['border-color', 'background-color']),
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  multiline: {
    padding: '9px 15px',
    wordBreak: 'break-all',
  },
  focused: {
    borderColor: theme.palette.primary['A700'],
    backgroundColor: theme.palette.background.default,
  },
  disabled: {
    color: theme.palette.secondary.dark,
  },
  error: {
    borderColor: theme.palette.error.dark,
  },
}))(InputBase);
