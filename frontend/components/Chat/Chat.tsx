import { useReactiveVar } from '@apollo/client';
import { Box, Drawer, Hidden } from '@material-ui/core';
import React from 'react';
import useChatSubscriptions from '../../hooks/useChatSubscriptions';
import { openChatDrawer } from '../../lib/apolloVars';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMessagesSkeleton from '../ChatMessages/ChatMessagesSkeleton';
import useChatStyles from './ChatStyles';

const Chat = ({ roomId }: { roomId: number }) => {
  const { data } = useChatSubscriptions(roomId);
  const isOpen = useReactiveVar(openChatDrawer);
  const classes = useChatStyles();

  return (
    <>
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
      <Hidden mdUp>
        <Drawer
          classes={{
            paper: classes.paper,
          }}
          anchor="bottom"
          open={isOpen}
          onClose={() => openChatDrawer(false)}
        >
          <Box
            width='100%'
            display="flex"
            flexDirection="column"
            flexShrink={0}
            maxHeight="100%"
            pl="5px"
          >
            {data?.initialMessages ? (
              <ChatMessages messages={data.initialMessages} />
            ) : (
              <ChatMessagesSkeleton />
            )}
            <ChatInput roomId={roomId} />
          </Box>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Chat;
