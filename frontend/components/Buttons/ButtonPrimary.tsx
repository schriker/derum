import { Button, createStyles, Theme, withStyles } from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontSize: 16,
      fontWeight: 700,
      textTransform: 'initial',
      color: theme.palette.text.primary,
      backgroundColor: styledBy('color', {
        primary: theme.palette.primary['A700'],
        secondary: theme.palette.secondary['800'],
      }),
      padding: '5px 20px',
      '&:hover': {
        backgroundColor: styledBy('color', {
          primary: theme.palette.primary['A400'],
          secondary: theme.palette.secondary['700'],
        }),
      },
    },
    disabled: {
      backgroundColor: theme.palette.grey[300],
    },
  });

export const ButtonPrimary = withStyles(styles)(Button);
