import Box from '@material-ui/core/Box';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import LoginButton from '../LoginButton/LoginButton';
import NavBarUser from '../NavBarUser/NavBarUser';

const NavBarLogin = () => {
  const { data } = useMeQuery({
    nextFetchPolicy: 'cache-only',
  });

  return (
    <Box justifySelf="end" display="flex" justifyContent="flex-end">
      {data ? <NavBarUser /> : <LoginButton />}
    </Box>
  );
};

export default NavBarLogin;
