import { Box } from '@material-ui/core';
import React from 'react';
import { InitialMessagesQuery } from '../../generated/graphql';
import ChatMessagesItem from './ChatMessagesItem';

const ChatMessages = ({
  messages,
}: {
  messages: InitialMessagesQuery['initialMessages'];
}) => {
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
      {messages.map((message) => (
        <ChatMessagesItem message={message} key={message.id} />
      ))}
    </Box>
  );
};

export default ChatMessages;
