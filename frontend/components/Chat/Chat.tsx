import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  MessageAddedDocument,
  MessageAddedSubscription,
  MessageDeletedDocument,
  MessageDeletedSubscription,
  useInitialMessagesQuery,
} from '../../generated/graphql';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMessagesSkeleton from '../ChatMessages/ChatMessagesSkeleton';

const Chat = ({ roomId }: { roomId: number }) => {
  const { data, subscribeToMore } = useInitialMessagesQuery({
    fetchPolicy: 'cache-first',
    variables: {
      roomId: roomId,
    },
  });

  useEffect(() => {
    subscribeToMore<MessageAddedSubscription>({
      document: MessageAddedDocument,
      variables: {
        roomId: roomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        const prevMessages = [...prev.initialMessages];
        return Object.assign({}, prev, {
          initialMessages: [newMessage, ...prevMessages.slice(0, -1)],
        });
      },
    });

    subscribeToMore<MessageDeletedSubscription>({
      document: MessageDeletedDocument,
      variables: {
        roomId: roomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const {
          data: {
            messageDeleted: { id },
          },
        } = subscriptionData;
        const messages = prev.initialMessages.filter(
          (message) => message.id !== id
        );
        return Object.assign({}, prev, {
          initialMessages: messages,
        });
      },
    });
  }, []);

  return (
    <Box width={400} display="flex" flexDirection="column">
      {data?.initialMessages ? (
        <ChatMessages messages={data.initialMessages} />
      ) : (
        <ChatMessagesSkeleton />
      )}
      <ChatInput roomId={roomId} />
    </Box>
  );
};

export default Chat;
