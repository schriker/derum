import { Box } from '@material-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import useChatSubscriptions from '../../hooks/useChatSubscriptions';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMessagesSkeleton from '../ChatMessages/ChatMessagesSkeleton';

const Chat = ({ roomId }: { roomId: number }) => {
  const { data } = useChatSubscriptions(roomId);

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
