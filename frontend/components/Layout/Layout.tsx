import { Box, Hidden } from '@material-ui/core';
import { AbilityContext } from '../../casl/Can';
import { useMeQuery } from '../../generated/graphql';
import { LayoutProps } from '../../types/layout';
import Header from '../Header/Header';
const LoginModal = dynamic(() => import('../LoginModal/LoginModal'));
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/SIdebar';
import SidebarDrawer from '../Sidebar/SidebarDrawer';
import defineAbilityFor from '../../casl/ability';
import dynamic from 'next/dynamic';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import React from 'react';
import OnlineUsersModal from '../OnlineUsers/OnlineUsersModal';
import UserSettingsModal from '../UserSettings/UserSettingsModal';
import useLayoutStyles from './LayoutStyles';
import SearchModal from '../Search/SearchModal';

const Layout = ({ children, ...rest }: LayoutProps) => {
  const { data: userdata } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useLayoutStyles();
  const ability = defineAbilityFor(userdata?.me);

  return (
    <AbilityContext.Provider value={ability}>
      <Header {...rest} />
      <NavBar />
      <Box className={classes.layout}>
        <Sidebar />
        {children}
      </Box>
      <SidebarDrawer />
      <LoginModal />
      <OnlineUsersModal />
      <UserSettingsModal />
      <Hidden mdUp>
        <SearchModal />
      </Hidden>
      <MobileNavigation />
    </AbilityContext.Provider>
  );
};

export default Layout;
