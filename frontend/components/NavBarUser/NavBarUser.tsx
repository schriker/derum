import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import BellIcon from '../Icons/BellIcon';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import DarkTooltip from '../Tooltip/Tooltip';
import UserDropdown from '../UserDropdown/UserDropdown';
import UserSettings from '../UserSettings/UserSettings';

const NavBarUser = (): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flex="1 1 auto"
    >
      <UserDropdown />
      <Box display="flex">
        <Box mx="5px">
          <DarkTooltip title="Powiadomienia" enterDelay={500}>
            <ButtonIcon color="secondary">
              <BellIcon style={{ fontSize: 18 }} />
            </ButtonIcon>
          </DarkTooltip>
        </Box>
        <OnlineUsers />
        <UserSettings />
      </Box>
    </Box>
  );
};

export default NavBarUser;
