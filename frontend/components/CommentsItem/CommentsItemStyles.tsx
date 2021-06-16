import { makeStyles, Theme } from '@material-ui/core';

const useCommentsItemStyles = makeStyles<Theme, { userColor: string }>(
  (theme: Theme) => ({
    wrapper: {
      display: 'flex',
    },
    content: {
      width: '100%',
    },
    body: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.grey[900],
      '& span': {
        marginLeft: 10,
      },
    },
    photo: {
      cursor: 'pointer',
      transition: theme.transitions.create('opacity'),
      '&:hover': {
        opacity: 0.75,
      },
    },
    author: {
      color: (props) => props.userColor,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
);

export default useCommentsItemStyles;
