import { Box } from '@material-ui/core';
import { LayoutProps } from '../../types/layout';
import GlobalError from '../GlobalError/GlobalError';
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/SIdebar';
import SidebarDrawer from '../Sidebar/SidebarDrawer';

const Layout = ({ children, ...rest }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header {...rest} />
      <NavBar />
      <Box display="flex" alignItems="stretch" height="calc(100% - 60px)">
        <Sidebar />
        {children}
      </Box>
      <SidebarDrawer />
      <LoginModal />
      <GlobalError />
    </>
  );
};

export default Layout;
