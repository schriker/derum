import { Box, Slide } from '@material-ui/core';
import React, { useState } from 'react';
import {
  InitialMessagesQuery,
  useMeQuery,
  useOnlineUsersQuery,
} from '../../generated/graphql';
import useIsScrolledToBottom from '../../hooks/useIsScrolledToBottom';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import useRoomData from '../../hooks/useRoomData';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import ArrowDownIcon from '../Icons/ArrowDownIcon';
import UserModal from '../UserModal/UserModal';
import ChatMessagesItem from './ChatMessagesItem';
import useChatMessagesStyles from './ChatMessagesStyles';

const ChatMessages = ({
  messages,
}: {
  messages: InitialMessagesQuery['initialMessages'];
}) => {
  const { data } = useMeQuery();
  const { roomData } = useRoomData();
  const classes = useChatMessagesStyles();
  const [userId, setUserId] = useState(null);
  const { wrapperRef, isBottom, scollToBottom } = useIsScrolledToBottom();
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const ignoresId = data?.me.ignore.map((user) => user.id);
  const { data: onlineUsers } = useOnlineUsersQuery({
    variables: {
      roomId: roomData.room.id,
    },
  });
  let authors = [
    ...new Set(messages.map((message) => message.author.displayName)),
  ];

  if (onlineUsers) {
    authors = [
      ...new Set([
        ...authors,
        ...onlineUsers.onlineUsers.map((user) => user.name),
      ]),
    ];
  }

  return (
    <Box className={classes.wrapper}>
      <Box {...{ ref: wrapperRef }} className={`scrollbar ${classes.chat}`}>
        {messages.map((message) =>
          ignoresId?.includes(message.author.id) ? null : (
            <ChatMessagesItem
              roomAuthorId={roomData.room.author?.id}
              authors={authors}
              userId={userId}
              setUserId={setUserId}
              handleOpen={handleOpen}
              message={message}
              key={message.id}
            />
          )
        )}
        {userId && (
          <UserModal
            openModal={openModal}
            handleClose={handleClose}
            id={userId}
          />
        )}
      </Box>
      <Slide direction="up" in={!isBottom} mountOnEnter unmountOnExit>
        <ButtonIcon
          color="primary"
          className={classes.bottomButton}
          onClick={scollToBottom}
        >
          <ArrowDownIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      </Slide>
    </Box>
  );
};

export default ChatMessages;
