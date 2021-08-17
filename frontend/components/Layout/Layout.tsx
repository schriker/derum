import { Box } from '@material-ui/core';
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

const Layout = ({ children, ...rest }: LayoutProps) => {
  const { data: userdata } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const ability = defineAbilityFor(userdata?.me);

  return (
    <AbilityContext.Provider value={ability}>
      <Header {...rest} />
      <NavBar />
      <Box display="flex" alignItems="stretch" height="calc(100% - 60px)">
        <Sidebar />
        {children}
      </Box>
      <SidebarDrawer />
      <LoginModal />
      <OnlineUsersModal />
      <UserSettingsModal />
      <MobileNavigation />
    </AbilityContext.Provider>
  );
};

export default Layout;
