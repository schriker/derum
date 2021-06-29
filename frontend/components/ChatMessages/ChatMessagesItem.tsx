import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useMeQuery } from '../../generated/graphql';
import useIsConnected from '../../hooks/useIsConnected';
import { ChatMessagesItemProps } from '../../types/messages';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import ChatMessageBody from '../ChatMessageBody/ChatMessageBody';
import ChatMessageActions from './ChatMessageActions';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessagesItem = ({
  message,
  setUserId,
  userId,
  handleOpen,
}: ChatMessagesItemProps): JSX.Element => {
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [showActions, setShowActions] = useState(false);
  const classes = useChatMessageItemStyles({
    userColor:
      !userData || userData?.me.showColorNames ? message.author.color : '#fff',
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
    if (userId) return setUserId(null);

    setUserId(message.author.id);
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
      {userData?.me.showAvatars || !userData ? (
        <Box mr={1}>
          <AvatarPhoto
            styles={{
              width: 30,
              height: 30,
            }}
            color={message.author.color}
            className={classes.avatar}
            onClick={(e) => handlerUserSelect(message.author.id, e)}
            src={message.author.photo}
            name={message.author.displayName}
          />
        </Box>
      ) : null}
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
        <ChatMessageBody body={message.body} />
      </Box>
    </Box>
  );
};

export default React.memo(ChatMessagesItem, () => true);
