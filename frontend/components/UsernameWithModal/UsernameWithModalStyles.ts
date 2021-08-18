import { makeStyles, Theme } from '@material-ui/core';

const useUsernameWithModalStyles = makeStyles<Theme, { userColor: string }>(
  (theme: Theme) => ({
    photo: {
      cursor: 'pointer',
      transition: theme.transitions.create('opacity'),
      marginRight: 5,
      '&:hover': {
        opacity: 0.75,
      },
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
      },
    },
    userName: (props) => ({
      color: props.userColor,
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    }),
  })
);

export default useUsernameWithModalStyles;
