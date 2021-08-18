import { useReactiveVar } from '@apollo/client';
import { Backdrop, Box, Drawer, Hidden, Slide } from '@material-ui/core';
import React from 'react';
import useChatSubscriptions from '../../hooks/useChatSubscriptions';
import { openChatDrawer } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMessagesSkeleton from '../ChatMessages/ChatMessagesSkeleton';
import CloseIcon from '../Icons/CloseIcon';
import useChatStyles from './ChatStyles';

const Chat = ({ roomId }: { roomId: number }) => {
  const { data } = useChatSubscriptions(roomId);
  const isOpen = useReactiveVar(openChatDrawer);
  const classes = useChatStyles();

  const handleClose = () => {
    openChatDrawer(false);
  };

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
        <Slide direction="up" in={isOpen}>
          <Box className={classes.paper}>
            <Box className={classes.wrapper}>
              <Box className={classes.close}>
                <ButtonIcon
                  size="small"
                  color="secondary"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <CloseIcon style={{ fontSize: 22 }} />
                </ButtonIcon>
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                flexShrink={0}
                maxHeight="100vh"
                pl="5px"
              >
                {data?.initialMessages ? (
                  <ChatMessages messages={data.initialMessages} />
                ) : (
                  <ChatMessagesSkeleton />
                )}
                <ChatInput roomId={roomId} />
              </Box>
            </Box>
          </Box>
        </Slide>
      </Hidden>
    </>
  );
};

export default Chat;
