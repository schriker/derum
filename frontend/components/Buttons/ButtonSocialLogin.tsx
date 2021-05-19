import { Button, createStyles, Theme, withStyles } from '@material-ui/core';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontSize: 16,
      fontWeight: 700,
      width: '100%',
      margin: '0 0 10px 0',
      textTransform: 'initial',
      color: theme.palette.text.primary,
      backgroundColor: styledBy('provider', {
        facebook: '#3B5998',
        google: '#EA4335',
        twitter: '#00ACEE',
      }),
      padding: '4px 16px',
      '&:hover': {
        backgroundColor: styledBy('provider', {
          facebook: 'rgb(74, 109, 183)',
          google: 'rgb(219, 87, 76)',
          twitter: 'rgb(64, 188, 236)',
        }),
      },
    },
    disabled: {
      backgroundColor: theme.palette.grey[300],
    },
  });

export const ButtonSocialLogin = withStyles(styles)(Button);
