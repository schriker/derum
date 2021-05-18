import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import MenuIcon from '../Icons/MenuIcon';
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
      <ButtonIcon aria-label="menu" color="secondary">
        <MenuIcon />
      </ButtonIcon>
      <Logo />
      <ButtonPrimary color="primary">Zaloguj</ButtonPrimary>
    </Box>
  );
};

export default NavBar;
