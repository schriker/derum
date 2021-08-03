import { withStyles, Theme, InputBase } from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

export const CustomInput = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    border: '2px solid',
    borderColor: 'transparent',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: styledBy('bg', {
      dark: theme.palette.background.paper,
      light: theme.palette.divider,
    }),
    '& input': {
      padding: '10px 15px',
    },
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
  adornedStart: {
    paddingLeft: 15,
    '& input': {
      padding: '10px 15px 10px 0',
    },
  },
  adornedEnd: {
    paddingRight: 15,
    '& input': {
      padding: '10px 0 10px 15px',
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
