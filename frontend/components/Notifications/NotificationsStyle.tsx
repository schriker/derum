import { makeStyles, Theme } from '@material-ui/core';

const useNotificiationsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: 320,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
    '&:focus': {
      backgroundColor: theme.palette.divider,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
  photo: {
    minWidth: 40,
  },
  status: {
    cursor: 'pointer',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary['A700'],
    flex: '0 0 auto',
    transition: theme.transitions.create(['background-color'], {
      duration: 200,
    }),
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

export default useNotificiationsStyles;
