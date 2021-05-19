import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import BellIcon from '../Icons/BellIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import UserIcon from '../Icons/UserIcon';
import UserDropdown from '../UserDropdown/UserDropdown';

const NavBarUser = () => {
  return (
    <Box display="flex" alignItems="center">
      <UserDropdown />
      <Box mx="5px">
        <ButtonIcon>
          <BellIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </Box>
      <Box mx="5px">
        <ButtonIcon>
          <UserIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </Box>
      <Box mx="5px">
        <ButtonIcon>
          <SettingsIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </Box>
    </Box>
  );
};

export default NavBarUser;
