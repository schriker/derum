import Box from '@material-ui/core/Box';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import LoginModal from '../LoginModal/LoginModal';
import NavBarUser from '../NavBarUser/NavBarUser';

const NavBarLogin = () => {
  const { data, loading } = useMeQuery({
    nextFetchPolicy: 'cache-only',
  });
  return (
    <Box justifySelf="end" display="flex" justifyContent="flex-end">
      {loading ? (
        <Skeleton>
          <LoginModal />
        </Skeleton>
      ) : data ? (
        <NavBarUser />
      ) : (
        <LoginModal />
      )}
    </Box>
  );
};

export default NavBarLogin;
