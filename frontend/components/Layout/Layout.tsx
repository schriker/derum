import { Box } from '@material-ui/core';
import { AbilityContext } from '../../casl/Can';
import { useMeQuery } from '../../generated/graphql';
import { LayoutProps } from '../../types/layout';
import GlobalError from '../GlobalError/GlobalError';
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/SIdebar';
import SidebarDrawer from '../Sidebar/SidebarDrawer';
import defineAbilityFor from '../../casl/ability';

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
      <GlobalError />
    </AbilityContext.Provider>
  );
};

export default Layout;
