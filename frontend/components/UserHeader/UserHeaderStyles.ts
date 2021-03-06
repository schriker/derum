import { makeStyles, Theme } from '@material-ui/core';

const useHeaderStyles = makeStyles<Theme, { userColor: string }>(
  (theme: Theme) => ({
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
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      '& :first-child': {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          fontSize: '16px',
        },
      },
    },
    userIcon: {
      color: theme.palette.primary['A700'],
      fontSize: 16,
    },
    userName: (props) => ({
      color: props.userColor,
      marginRight: '5px',
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
      },
    }),
    content: {
      flex: '1 1 100%',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(4),
      wordBreak: 'break-word',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1),
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  })
);

export default useHeaderStyles;
