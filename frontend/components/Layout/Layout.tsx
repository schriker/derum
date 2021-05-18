import { LayoutProps } from '../../types/layout';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

const Layout = ({ children, ...rest }: LayoutProps) => {
  return (
    <div>
      <Header {...rest} />
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
