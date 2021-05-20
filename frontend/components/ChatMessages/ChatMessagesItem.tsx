import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { ChatMessagesItemProps } from '../../types/messages';
import UserAvatar from '../UserAvatar/UserAvatar';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    cursor: 'pointer',
    transition: theme.transitions.create('opacity'),
    '&:hover': {
      opacity: 0.75,
    },
  },
  wrapper: {
    display: 'flex',
    wordBreak: 'break-word',
    transition: theme.transitions.create('background-color'),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    borderRadius: '3px',
    marginTop: '2px',
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
  },
  userName: (props: any) => ({
    color: props.userColor,
    marginRight: '5px',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  }),
}));

const ChatMessagesItem = ({ message }: ChatMessagesItemProps) => {
  const classes = useStyles({ userColor: '#FF026A' });

  return (
    <Box className={classes.wrapper}>
      <Box mr={1}>
        <UserAvatar
          styles={{
            width: 30,
            height: 30,
            backgroundColor: '#FF026A',
          }}
          className={classes.avatar}
          onClick={() => console.log(message.author.id)}
          src={message.author.photo}
          name={message.author.displayName}
        />
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle1"
            component="span"
            className={classes.userName}
          >
            {message.author.displayName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="span"
          >
            {dayjs(message.createdAt).format('HH:mm')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">{message.body}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessagesItem;
