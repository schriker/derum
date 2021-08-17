import { useReactiveVar } from '@apollo/client';
import {
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMeQuery } from '../../generated/graphql';
import {
  openOnlineUSersModalVar,
  openSearchModal,
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
  const onlineModal = useReactiveVar(openOnlineUSersModalVar);
  const settingsModal = useReactiveVar(openSettingsModal);
  const searchModal = useReactiveVar(openSearchModal);
  const [value, setValue] = useState(null);
  const { data } = useMeQuery({
    nextFetchPolicy: 'cache-only',
  });
  useEffect(() => {
    if (!settingsModal && !onlineModal && !searchModal) {
      setValue(null);
    }
  }, [settingsModal, onlineModal, searchModal]);

  const handleChange = (_: React.ChangeEvent, newValue: NavigationActions) => {
    setValue(newValue);
    switch (newValue) {
      case NavigationActions.ONLINE:
        return openOnlineUSersModalVar(true);
      case NavigationActions.SETTINGS:
        return openSettingsModal(true);
      case NavigationActions.SEARCH:
        return openSearchModal(true);
    }
  };

  return (
    <Hidden smUp>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        {data && (
          <BottomNavigationAction
            label="Online"
            value={NavigationActions.ONLINE}
            icon={<UserIcon />}
          />
        )}
        {data && (
          <BottomNavigationAction
            label="Ustawienia"
            value={NavigationActions.SETTINGS}
            icon={<SettingsIcon />}
          />
        )}
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
