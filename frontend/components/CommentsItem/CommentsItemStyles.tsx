import { makeStyles, Theme } from '@material-ui/core';
import { CommentsItemStyles } from '../../types/styles';

const MAX_NEST_LEVEL = 1;

const useCommentsItemStyles = makeStyles<Theme, CommentsItemStyles>(
  (theme: Theme) => ({
    wrapper: {
      paddingLeft: (props) =>
        props.level > MAX_NEST_LEVEL
          ? MAX_NEST_LEVEL * 44
          : props.level > 0
          ? 44 * props.level
          : 0,
      display: 'flex',
      '&:hover $replyButton': {
        opacity: 1,
      },
    },
    content: {
      width: '100%',
    },
    body: {
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    headerWrapper: {
      display: 'flex',
      paddingTop: 4,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 4,
      justifyContent: 'space-between',
      backgroundColor: theme.palette.grey[900],
    },
    replyButton: {
      marginLeft: 8,
      opacity: 0,
      transition: theme.transitions.create('opacity', { duration: 200 }),
    },
    deleted: {
      marginTop: theme.spacing(1),
      fontStyle: 'italic',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      '& span': {
        marginLeft: 8,
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
    popover: {
      padding: '10px 20px',
    },
  })
);

export default useCommentsItemStyles;
