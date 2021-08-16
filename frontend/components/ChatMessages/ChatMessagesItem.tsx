import { useReactiveVar } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMeQuery } from '../../generated/graphql';
import useIsConnected from '../../hooks/useIsConnected';
import { selectedUserVar } from '../../lib/apolloVars';
import { ChatMessagesItemProps } from '../../types/messages';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import AdminBadge from '../Badges/AdminBadge';
import ModeratorBadge from '../Badges/ModeratorBadge';
import OwnerBadge from '../Badges/OwnerBadge';
import ChatMessageBody from '../ChatMessageBody/ChatMessageBody';
import ChatMessageActions from './ChatMessageActions';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessagesItem = ({
  message,
  setUserId,
  handleOpen,
  authors = [],
  isUserProfileView = false,
  roomAuthorId = 0,
}: ChatMessagesItemProps) => {
  const router = useRouter();
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [showActions, setShowActions] = useState(false);
  const selectedUser = useReactiveVar(selectedUserVar);
  const classes = useChatMessageItemStyles({
    userColor:
      !userData || userData?.me.showColorNames ? message.author.color : '#fff',
    selectedUser: !!selectedUser,
    isSelected: message.author.displayName === selectedUser,
  });

  const isConnected = useIsConnected();

  const handlerUserSelect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserId(id);
    handleOpen();
  };

  const handleRedirect = () => {
    router.push(`/p/${message.room.name}`);
  };

  const handleHighLightMessages = () => {
    if (selectedUser) return selectedUserVar(null);
    selectedUserVar(message.author.displayName);
  };

  return (
    <Box
      className={classes.wrapper}
      onMouseEnter={() => setShowActions((prevState) => !prevState)}
      onMouseLeave={() => setShowActions(false)}
      onClick={isUserProfileView ? handleRedirect : handleHighLightMessages}
    >
      {showActions && isConnected && <ChatMessageActions message={message} />}
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
            src={message.author.photo?.url}
            name={message.author.displayName}
          />
        </Box>
      ) : null}
      <Box>
        <Box display="flex" alignItems="center">
          {message.author.isAdmin && <AdminBadge />}
          {message.author.isModerator && <ModeratorBadge />}
          {message.author.id === roomAuthorId && <OwnerBadge />}
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
            title={dayjs(message.createdAt).format('DD.MM.YYYY - HH:mm')}
          >
            {dayjs(message.createdAt).format('HH:mm')}
          </Typography>
        </Box>
        <ChatMessageBody authors={authors} body={message.body} />
      </Box>
    </Box>
  );
};

export default React.memo(ChatMessagesItem, () => true);
