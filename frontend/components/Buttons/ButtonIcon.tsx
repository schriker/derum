import { IconButton, Theme, withStyles } from '@material-ui/core';

export const ButtonIcon = withStyles((theme: Theme) => ({
  root: {
    textTransform: 'initial',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
  },
}))(IconButton);
