import { Box, Hidden } from '@material-ui/core';
import React from 'react';
import useChatSubscriptions from '../../hooks/useChatSubscriptions';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMessagesSkeleton from '../ChatMessages/ChatMessagesSkeleton';

const Chat = ({ roomId }: { roomId: number }) => {
  const { data } = useChatSubscriptions(roomId);

  return (
    <Hidden smDown>
      <Box
        width={400}
        display="flex"
        mr="5px"
        flexDirection="column"
        flexShrink={0}
      >
        {data?.initialMessages ? (
          <ChatMessages messages={data.initialMessages} />
        ) : (
          <ChatMessagesSkeleton />
        )}
        <ChatInput roomId={roomId} />
      </Box>
    </Hidden>
  );
};

export default Chat;
