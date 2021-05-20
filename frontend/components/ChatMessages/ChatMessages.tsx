import { Box } from '@material-ui/core';
import React from 'react';
import { InitialMessagesQuery } from '../../generated/graphql';
import ChatMessagesItem from './ChatMessagesItem';
import styles from './ChatMessages.module.css';

const ChatMessages = ({
  messages,
}: {
  messages: InitialMessagesQuery['initialMessages'];
}) => {
  return (
    <Box
      className={styles.scrollbar}
      flex="1 1 auto"
      overflow="auto"
      flexDirection="column-reverse"
      display="flex"
      pr="5px"
      maxHeight="calc(100% - 70px)"
    >
      {messages.map((message) => (
        <ChatMessagesItem message={message} key={message.id} />
      ))}
    </Box>
  );
};

export default ChatMessages;
