import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import {
  InitialMessagesQuery,
  useMeQuery,
  useOnlineUsersQuery,
} from '../../generated/graphql';
import useIsScrolledToBottom from '../../hooks/useIsScrolledToBottom';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import useRoomData from '../../hooks/useRoomData';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import ArrowDropdown from '../Icons/ArrowDropdownIcon';
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
      {!isBottom && (
        <ButtonDefault className={classes.bottomButton} onClick={scollToBottom}>
          Wróć do najnowszych
        </ButtonDefault>
      )}
    </Box>
  );
};

export default ChatMessages;
