import { Button, createStyles, Theme, withStyles } from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontWeight: 700,
      textTransform: 'initial',
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
      padding: '5px 20px',
      '&:hover': {
        backgroundColor: styledBy('color', {
          primary: theme.palette.primary['A400'],
          secondary: theme.palette.secondary['700'],
          default: theme.palette.grey.A100,
        }),
      },
    },
    disabled: {
      backgroundColor: theme.palette.grey[300],
    },
  });

export const ButtonPrimary = withStyles(styles)(Button);
