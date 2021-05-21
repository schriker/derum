import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import BellIcon from '../Icons/BellIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import UserIcon from '../Icons/UserIcon';
import DarkTooltip from '../Tooltip/Tooltip';
import UserDropdown from '../UserDropdown/UserDropdown';

const NavBarUser = () => {
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
        <Box mx="5px">
          <DarkTooltip title="Użytkownicy online" enterDelay={500}>
            <ButtonIcon color="secondary">
              <UserIcon style={{ fontSize: 18 }} />
            </ButtonIcon>
          </DarkTooltip>
        </Box>
        <Box mx="5px">
          <DarkTooltip title="Ustawienia" enterDelay={500}>
            <ButtonIcon color="secondary">
              <SettingsIcon style={{ fontSize: 18 }} />
            </ButtonIcon>
          </DarkTooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBarUser;
