import { makeStyles, Theme } from '@material-ui/core';
import { CommentsItemStyles } from '../../types/styles';

const MAX_NEST_LEVEL = 1;

const useCommentsItemStyles = makeStyles<Theme, CommentsItemStyles>(
  (theme: Theme) => ({
    wrapper: {
      marginLeft: (props) =>
        props.level > MAX_NEST_LEVEL
          ? MAX_NEST_LEVEL * 44
          : props.level > 0
          ? 44 * props.level
          : 0,
      display: 'flex',
      '&:hover $replyButton': {
        opacity: 1,
      },
      borderLeft: (props) =>
        props.isHighlighted
          ? `3px solid ${theme.palette.primary['A700']}`
          : null,
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
      position: 'relative',
      paddingTop: theme.spacing(0.5),
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      paddingBottom: theme.spacing(0.5),
      justifyContent: 'space-between',
      backgroundColor: theme.palette.secondary['A700'],
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    replyButton: {
      marginLeft: theme.spacing(1),
      opacity: 0,
      transition: theme.transitions.create('opacity', { duration: 200 }),
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
      },
    },
    deleted: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontStyle: 'italic',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    buttons: {
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: -12,
        right: 3,
      },
    },
    time: {
      marginLeft: 10,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
      },
    },
    popover: {
      padding: '10px 20px',
    },
    responseToButton: {
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: 5,
        left: 5,
      },
    },
  })
);

export default useCommentsItemStyles;
