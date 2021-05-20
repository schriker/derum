import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect } from 'react';
import {
  MessageAddedDocument,
  MessageAddedSubscription,
  useInitialMessagesQuery,
} from '../../generated/graphql';
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
        return Object.assign({}, prev, {
          initialMessages: [newMessage, ...prev.initialMessages],
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
      <Box height={70}>Input</Box>
    </Box>
  );
};

export default Chat;
