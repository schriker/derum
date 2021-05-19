import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import LoginModal from '../LoginModal/LoginModal';
import NavBarUser from '../NavBarUser/NavBarUser';

const NavBarLogin = () => {
  const { data, loading } = useMeQuery({
    nextFetchPolicy: 'cache-only',
  });
  return loading ? (
    <Skeleton>
      <LoginModal />
    </Skeleton>
  ) : data ? (
    <NavBarUser />
  ) : (
    <LoginModal />
  );
};

export default NavBarLogin;
