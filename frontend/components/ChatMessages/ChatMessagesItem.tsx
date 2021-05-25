import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import useIsConnected from '../../hooks/useIsConnected';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import { ChatMessagesItemProps } from '../../types/messages';
import UserAvatar from '../UserAvatar/UserAvatar';
import UserModal from '../UserModal/UserModal';
import ChatMessageActions from './ChatMessageActions';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessagesItem = ({ message }: ChatMessagesItemProps) => {
  const [showActions, setShowActions] = useState(false);
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const [userId, setUserId] = useState(null);
  const classes = useChatMessageItemStyles({ userColor: '#FF026A' });
  const isConnected = useIsConnected();

  const handlerUserSelect = (id: number) => {
    setUserId(id);
    handleOpen();
  };

  return (
    <Box
      className={classes.wrapper}
      onMouseEnter={() => setShowActions((prevState) => !prevState)}
      onMouseLeave={() => setShowActions(false)}
    >
      {showActions && isConnected && (
        <ChatMessageActions messageId={message.id} />
      )}
      <Box mr={1}>
        <UserAvatar
          styles={{
            width: 30,
            height: 30,
          }}
          className={classes.avatar}
          onClick={() => handlerUserSelect(message.author.id)}
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
            onClick={() => handlerUserSelect(message.author.id)}
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
      {userId && (
        <UserModal
          openModal={openModal}
          handleClose={handleClose}
          id={userId}
        />
      )}
    </Box>
  );
};

export default ChatMessagesItem;
