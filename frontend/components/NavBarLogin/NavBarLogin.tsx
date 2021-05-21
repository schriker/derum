import Box from '@material-ui/core/Box';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import LoginButton from '../LoginButton/LoginButton';
import NavBarUser from '../NavBarUser/NavBarUser';

const NavBarLogin = () => {
  const { data, loading } = useMeQuery({
    nextFetchPolicy: 'cache-only',
  });
  return (
    <Box justifySelf="end" display="flex" justifyContent="flex-end">
      {loading ? (
        <Skeleton>
          <LoginButton />
        </Skeleton>
      ) : data ? (
        <NavBarUser />
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default NavBarLogin;
