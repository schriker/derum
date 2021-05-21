import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonMenu } from '../Buttons/ButtonMenu';
import MenuIcon from '../Icons/MenuIcon';
import Logo from '../Logo/Logo';
import NavBarLogin from '../NavBarLogin/NavBarLogin';

const NavBar = () => {
  return (
    <Box
      style={{
        gridTemplateColumns: 'auto 2fr 1fr',
      }}
      bgcolor="background.paper"
      display="grid"
      height={60}
      alignItems="center"
      pr={1}
      pl={1}
    >
      <Box display="flex" alignItems="center">
        <ButtonMenu aria-label="menu" color="secondary">
          <MenuIcon />
        </ButtonMenu>
        {/* <Box ml={2}>
          <Logo />
        </Box> */}
      </Box>
      <Box justifySelf="center">Wyszukiwarka</Box>
      <NavBarLogin />
    </Box>
  );
};

export default NavBar;
