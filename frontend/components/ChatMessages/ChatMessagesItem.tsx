import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import useIsConnected from '../../hooks/useIsConnected';
import { ChatMessagesItemProps } from '../../types/messages';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import ChatMessageActions from './ChatMessageActions';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessagesItem = ({
  message,
  setUserId,
  userId,
  handleOpen,
}: ChatMessagesItemProps) => {
  const [showActions, setShowActions] = useState(false);
  const classes = useChatMessageItemStyles({
    userColor: '#FF026A',
    selectedUser: userId,
    isSelected: message.author.id === userId,
  });

  const isConnected = useIsConnected();

  const handlerUserSelect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserId(id);
    handleOpen();
  };

  const handleHighLightMessages = () => {
    if (userId) {
      setUserId(null);
    } else {
      setUserId(message.author.id);
    }
  };

  return (
    <Box
      className={classes.wrapper}
      onMouseEnter={() => setShowActions((prevState) => !prevState)}
      onMouseLeave={() => setShowActions(false)}
      onClick={handleHighLightMessages}
    >
      {showActions && isConnected && (
        <ChatMessageActions messageId={message.id} />
      )}
      <Box mr={1}>
        <AvatarPhoto
          styles={{
            width: 30,
            height: 30,
          }}
          color="#FF026A"
          className={classes.avatar}
          onClick={(e) => handlerUserSelect(message.author.id, e)}
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
            onClick={(e) => handlerUserSelect(message.author.id, e)}
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
