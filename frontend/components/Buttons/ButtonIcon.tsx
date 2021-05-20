import { IconButton, Theme, withStyles } from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

export const ButtonIcon = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: styledBy('color', {
      primary: theme.palette.primary['A700'],
      secondary: theme.palette.secondary['800'],
    }),
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: styledBy('color', {
        primary: theme.palette.primary['A400'],
        secondary: theme.palette.secondary['700'],
      }),
    },
  },
}))(IconButton);
