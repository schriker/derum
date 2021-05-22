import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ChatMessagesItemProps } from '../../types/messages';
import UserAvatar from '../UserAvatar/UserAvatar';
import ChatMessageActions from './ChatMessageActions';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessagesItem = ({ message }: ChatMessagesItemProps) => {
  const [showActions, setShowActions] = useState(false);
  const classes = useChatMessageItemStyles({ userColor: '#FF026A' });

  return (
    <Box
      className={classes.wrapper}
      onMouseEnter={() => setShowActions((prevState) => !prevState)}
      onMouseLeave={() => setShowActions(false)}
    >
      {showActions && <ChatMessageActions messageId={message.id} />}
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
            onClick={() => console.log(message.author.id)}
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
