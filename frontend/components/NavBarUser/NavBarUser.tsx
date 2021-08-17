import { Box, Hidden } from '@material-ui/core';
import React from 'react';
import Notifications from '../Notifications/Notifications';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import SearchMobileButton from '../Search/SearchMobileButton';
import UserDropdown from '../UserDropdown/UserDropdown';
import UserSettings from '../UserSettings/UserSettings';

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
        <Notifications />
        <Hidden xsDown>
          <OnlineUsers />
          <UserSettings />
          <Hidden mdUp>
            <SearchMobileButton />
            <UserSettings />
          </Hidden>
        </Hidden>
      </Box>
    </Box>
  );
};

export default NavBarUser;
