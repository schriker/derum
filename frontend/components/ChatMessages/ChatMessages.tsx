import { Box } from '@material-ui/core';
import React from 'react';
import { InitialMessagesQuery, useMeQuery } from '../../generated/graphql';
import ChatMessagesItem from './ChatMessagesItem';

const ChatMessages = ({
  messages,
}: {
  messages: InitialMessagesQuery['initialMessages'];
}) => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const ignoresId = data?.me.ignore.map((user) => user.id);
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
          <ChatMessagesItem message={message} key={message.id} />
        )
      )}
    </Box>
  );
};

export default ChatMessages;
