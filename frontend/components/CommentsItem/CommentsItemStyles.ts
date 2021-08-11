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
      paddingTop: theme.spacing(0.5),
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      paddingBottom: theme.spacing(0.5),
      justifyContent: 'space-between',
      backgroundColor: theme.palette.secondary['A700'],
    },
    replyButton: {
      marginLeft: theme.spacing(1),
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
    },
    popover: {
      padding: '10px 20px',
    },
  })
);

export default useCommentsItemStyles;
