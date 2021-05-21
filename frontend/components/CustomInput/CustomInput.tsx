import { withStyles, Theme, InputBase } from '@material-ui/core';

export const CustomInput = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    border: '2px solid',
    padding: '3px 15px 3px 15px',
    borderColor: 'transparent',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['border-color', 'background-color']),
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  multiline: {
    padding: '3px 20px',
  },
  focused: {
    borderColor: theme.palette.primary['A700'],
    backgroundColor: theme.palette.background.default,
  },
  error: {
    borderColor: theme.palette.error.dark,
  },
}))(InputBase);
