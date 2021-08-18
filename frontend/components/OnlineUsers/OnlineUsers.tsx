import { Box } from '@material-ui/core';
import React from 'react';
import { openOnlineUSersModalVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import UserIcon from '../Icons/UserIcon';
import DarkTooltip from '../Tooltip/Tooltip';

const OnlineUsers = () => {
  const handleOpen = () => {
    openOnlineUSersModalVar(true);
  };

  return (
    <Box mx="5px">
      <DarkTooltip title="Użytkownicy online" enterDelay={500}>
        <ButtonIcon onClick={handleOpen} color="secondary">
          <UserIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </DarkTooltip>
    </Box>
  );
};

export default OnlineUsers;
