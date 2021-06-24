import { makeStyles, Theme } from '@material-ui/core';

const useNotificiationsStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
    transition: theme.transitions.create(['background-color'], {
      duration: 200,
    }),
  },
  photo: {
    marginRight: theme.spacing(1),
  },
  status: {
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
  message: {
    flex: '1 1 auto',
  },
}));

export default useNotificiationsStyles;
