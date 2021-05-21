import { Box } from '@material-ui/core';
import { LayoutProps } from '../../types/layout';
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/SIdebar';

const Layout = ({ children, ...rest }: LayoutProps) => {
  return (
    <>
      <Header {...rest} />
      <NavBar />
      <LoginModal />
      <Box display="flex" alignItems="stretch" height="calc(100% - 60px)">
        <Sidebar />
        {children}
      </Box>
    </>
  );
};

export default Layout;
