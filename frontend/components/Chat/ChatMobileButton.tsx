import { Box } from '@material-ui/core';
import React from 'react';
import { openChatDrawer } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import ChatIcon from '../Icons/ChatIcon';
import DarkTooltip from '../Tooltip/Tooltip';

const ChatMobileButton = () => {
  const handleOpen = () => {
    openChatDrawer(true);
  };

  return (
    <Box mx="5px">
      <DarkTooltip title="Ustawienia" enterDelay={500}>
        <ButtonIcon onClick={handleOpen} color="secondary">
          <ChatIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </DarkTooltip>
    </Box>
  );
};

export default ChatMobileButton;
