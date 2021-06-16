import { makeStyles, Theme } from '@material-ui/core';

const useCommentsItemStyles = makeStyles<Theme, { userColor: string }>(
  (theme: Theme) => ({
    wrapper: {
      display: 'flex',
      '&:hover $replyButton': {
        opacity: 1,
      },
    },
    content: {
      width: '100%',
    },
    body: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    headerWrapper: {
      display: 'flex',
      padding: theme.spacing(1),
      justifyContent: 'space-between',
      backgroundColor: theme.palette.grey[900],
    },
    replyButton: {
      opacity: 0,
      transition: theme.transitions.create('opacity', { duration: 200 }),
    },
    header: {
      display: 'flex',
      alignItems: 'center',
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
