import { IconButton, Theme, withStyles } from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

export const ButtonIcon = withStyles((theme: Theme) => ({
  root: {
    color: styledBy('color', {
      primary: theme.palette.text.primary,
      secondary: theme.palette.text.primary,
      default: theme.palette.text.secondary,
    }),
    backgroundColor: styledBy('color', {
      primary: theme.palette.primary['A700'],
      secondary: theme.palette.secondary['800'],
      default: theme.palette.text.primary,
    }),
    '&:hover': {
      backgroundColor: styledBy('color', {
        primary: theme.palette.primary['A400'],
        secondary: theme.palette.secondary['700'],
        default: theme.palette.grey.A100,
      }),
    },
  },
  disabled: {
    color: styledBy('color', {
      primary: `${theme.palette.text.primary} !important`,
      secondary: `${theme.palette.text.primary} !important`,
      default: `${theme.palette.text.secondary} !important`,
    }),
    backgroundColor: styledBy('color', {
      primary: `${theme.palette.primary['A700']} !important`,
      secondary: `${theme.palette.secondary['800']} !important`,
      default: `${theme.palette.text.primary} !important`,
    }),
    '&:hover': {
      backgroundColor: styledBy('color', {
        primary: `${theme.palette.primary['A400']} !important`,
        secondary: `${theme.palette.secondary['700']} !important`,
        default: `${theme.palette.grey.A100} !important`,
      }),
    },
  },
}))(IconButton);
