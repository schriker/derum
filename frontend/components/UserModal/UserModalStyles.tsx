import { makeStyles, Theme } from '@material-ui/core';

const useUserModalStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > div:last-child': {
      marginTop: 15,
    },
  },
  avatar: {
    width: 55,
    height: 55,
    marginBottom: 10,
    fontSize: 26,
    cursor: 'pointer',
  },
  online: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    marginRight: 6,
    marginTop: 3,
    marginLeft: -12,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    '& > :first-child': {
      marginRight: 10,
    },
  },
}));

export default useUserModalStyles;
