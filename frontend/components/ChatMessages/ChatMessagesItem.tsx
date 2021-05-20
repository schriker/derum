import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { ChatMessagesItemProps } from '../../types/messages';
import UserAvatar from '../UserAvatar/UserAvatar';

const ChatMessagesItem = ({ message }: ChatMessagesItemProps) => {
  return (
    <Box
      bgcolor="background.paper"
      display="flex"
      px={2}
      py={1}
      my="1px"
      style={{ wordBreak: 'break-word' }}
      borderRadius={3}
    >
      <Box mr={1}>
        <UserAvatar
          src={message.author.photo}
          name={message.author.displayName}
          color="#FF026A"
        />
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle1"
            component="span"
            style={{ color: '#FF026A' }}
          >
            {message.author.displayName}
          </Typography>
          <Typography
            style={{ marginLeft: 5 }}
            color="textSecondary"
            variant="subtitle2"
            component="span"
          >
            {dayjs(message.createdAt).format('HH:mm:ss')}
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
