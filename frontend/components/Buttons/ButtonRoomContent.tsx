import { Button, createStyles, Theme, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flex: '1 1 auto',
      fontSize: 16,
      fontWeight: 600,
      textTransform: 'initial',
      borderRadius: 0,
      color: theme.palette.text.primary,
      borderBottom: '2px solid transparent',
      padding: '5px 20px',
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.primary['A400']}`,
      },
    },
    startIcon: {
      color: theme.palette.text.secondary,
    },
    disabled: {
      backgroundColor: theme.palette.grey[300],
    },
  });

export const ButtonRoomContent = withStyles(styles)(Button);
