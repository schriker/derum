import { makeStyles, Theme } from '@material-ui/core';
import { ChatMessageItemStyles } from '../../types/styles';

const useChatMessageItemStyles = makeStyles<Theme, ChatMessageItemStyles>(
  (theme: Theme) => ({
    avatar: {
      cursor: 'pointer',
      transition: theme.transitions.create('opacity'),
      '&:hover': {
        opacity: 0.75,
      },
    },
    actions: {
      position: 'absolute',
      right: 4,
      top: 4,
      zIndex: 999,
      opacity: 1,
      padding: '2px 4px',
      backgroundColor: theme.palette.secondary[800],
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
    },
    wrapper: (props) => ({
      opacity: !props.selectedUser ? 1 : props.isSelected ? 1 : 0.5,
      position: 'relative',
      display: 'flex',
      wordBreak: 'break-word',
      transition: theme.transitions.create(['background-color', 'opacity'], {
        duration: 100,
      }),
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      marginTop: '2px',
      '&:hover': {
        backgroundColor: theme.palette.secondary['A700'],
        cursor: 'pointer',
      },
    }),
    userName: (props) => ({
      color: props.userColor,
      marginRight: '5px',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    }),
  })
);

export default useChatMessageItemStyles;
