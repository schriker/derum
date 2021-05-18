import { IconButton, Theme, withStyles } from '@material-ui/core';

export const ButtonIcon = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.divider,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey['800'],
    },
  },
}))(IconButton);
