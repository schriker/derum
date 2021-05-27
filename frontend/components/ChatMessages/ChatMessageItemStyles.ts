import { makeStyles, Theme } from '@material-ui/core';

const useChatMessageItemStyles = makeStyles((theme: Theme) => ({
  avatar: {
    cursor: 'pointer',
    transition: theme.transitions.create('opacity'),
    '&:hover': {
      opacity: 0.75,
    },
  },
  actions: {
    position: 'absolute',
    right: 8,
    top: -8,
    zIndex: 999,
    opacity: 1,
    padding: '2px 8px',
    transition: theme.transitions.create('opacity'),
    backgroundColor: theme.palette.grey[800],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  },
  wrapper: (props: any) => ({
    opacity: !props.selectedUser
      ? 1
      : props.selectedUser === props.author
      ? 1
      : 0.5,
    position: 'relative',
    display: 'flex',
    wordBreak: 'break-word',
    transition: theme.transitions.create(['background-color', 'opacity']),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    marginTop: '2px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      cursor: 'pointer',
    },
  }),
  userName: (props: any) => ({
    color: props.userColor,
    marginRight: '5px',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  }),
}));

export default useChatMessageItemStyles;
