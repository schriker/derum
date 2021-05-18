import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonMenu } from '../Buttons/ButtonMenu';
import MenuIcon from '../Icons/MenuIcon';
import LoginModal from '../Login/Login';
import Logo from '../Logo/Logo';

const NavBar = () => {
  return (
    <Box
      bgcolor="background.paper"
      display="flex"
      height={65}
      alignItems="center"
      justifyContent="space-between"
      pr={2}
      pl={1}
    >
      <ButtonMenu aria-label="menu" color="secondary">
        <MenuIcon />
      </ButtonMenu>
      <Logo />
      <LoginModal />
    </Box>
  );
};

export default NavBar;
