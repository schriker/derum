import { withStyles, Theme, InputBase } from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

export const CustomInput = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    border: '2px solid',
    padding: '3px 15px',
    borderColor: 'transparent',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: styledBy('bg', {
      dark: theme.palette.background.paper,
      light: theme.palette.divider,
    }),
    transition: theme.transitions.create(['border-color', 'background-color'], {
      duration: 200,
    }),
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '&:hover': {
      borderColor: theme.palette.grey[700],
    },
  },
  multiline: {
    padding: '9px 15px',
    wordBreak: 'break-word',
  },
  focused: {
    borderColor: theme.palette.primary['A700'],
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      borderColor: theme.palette.primary['A700'],
    },
  },
  disabled: {
    color: theme.palette.secondary.dark,
  },
  error: {
    borderColor: theme.palette.error.dark,
  },
}))(InputBase);
