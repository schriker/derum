import {
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  openOnlineUSersModalVar,
  openSettingsModal,
} from '../../lib/apolloVars';
import { NavigationActions } from '../../types/mobileNavigation';
import ChatIcon from '../Icons/ChatIcon';
import SearchIcon from '../Icons/SearchIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import UserIcon from '../Icons/UserIcon';
import useMobileNavigationStyles from './MobileNavigationStyles';

const MobileNavigation = () => {
  const classes = useMobileNavigationStyles();
  const [value, setValue] = useState(null);
  const handleChange = (_: React.ChangeEvent, newValue: NavigationActions) => {
    setValue(newValue);
    switch (newValue) {
      case NavigationActions.ONLINE:
        return openOnlineUSersModalVar(true);
      case NavigationActions.SETTINGS:
        return openSettingsModal(true);
    }
  };

  return (
    <Hidden smUp>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Online"
          value={NavigationActions.ONLINE}
          icon={<UserIcon />}
        />
        <BottomNavigationAction
          label="Ustawienia"
          value={NavigationActions.SETTINGS}
          icon={<SettingsIcon />}
        />
        <BottomNavigationAction
          label="Szukaj"
          value={NavigationActions.SEARCH}
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Czat"
          value={NavigationActions.CHAT}
          icon={<ChatIcon />}
        />
      </BottomNavigation>
    </Hidden>
  );
};

export default MobileNavigation;
