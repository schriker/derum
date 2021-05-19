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
        gridTemplateColumns: 'auto auto 1fr',
      }}
      bgcolor="background.paper"
      display="grid"
      height={65}
      alignItems="center"
      pr={2}
      pl={1}
    >
      <Box display="flex" alignItems="center">
        <ButtonMenu aria-label="menu" color="secondary">
          <MenuIcon />
        </ButtonMenu>
        <Box ml={2}>
          <Logo />
        </Box>
      </Box>
      <Box ml={10} mr={5}>
        Wyszukiwarka
      </Box>
      <Box mr="0" ml="auto">
        <NavBarLogin />
      </Box>
    </Box>
  );
};

export default NavBar;
