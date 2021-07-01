import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import {
  InitialMessagesQuery,
  useMeQuery,
  useOnlineUsersQuery,
} from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import useRoomData from '../../hooks/useRoomData';
import UserModal from '../UserModal/UserModal';
import ChatMessagesItem from './ChatMessagesItem';

const ChatMessages = ({
  messages,
}: {
  messages: InitialMessagesQuery['initialMessages'];
}): JSX.Element => {
  const { data } = useMeQuery();
  const { roomData } = useRoomData();
  const [userId, setUserId] = useState(null);
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
    <Box
      className="scrollbar"
      flex="1 1 auto"
      overflow="auto"
      flexDirection="column-reverse"
      display="flex"
      pr="5px"
      height="100%"
    >
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
  );
};

export default ChatMessages;
