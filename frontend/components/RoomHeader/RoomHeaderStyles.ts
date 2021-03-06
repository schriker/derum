import { makeStyles, Theme } from '@material-ui/core';

const useHeaderStyles = makeStyles<Theme>((theme: Theme) => ({
  photo: {
    height: 50,
    width: 50,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      marginBottom: theme.spacing(2),
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    '& :first-child': {
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
        marginTop: 10,
        fontSize: '18px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  userIcon: {
    marginLeft: 2,
    color: theme.palette.text.secondary,
    fontSize: 16,
  },
  content: {
    flex: '1 1 100%',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
    wordBreak: 'break-word',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      marginLeft: 0,
      marginRight: 0,
      marginBottom: theme.spacing(2),
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

export default useHeaderStyles;
