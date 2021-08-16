import { Box, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { openDrawerVar } from '../../lib/apolloVars';
import { ButtonMenu } from '../Buttons/ButtonMenu';
import MenuIcon from '../Icons/MenuIcon';
import Logo from '../Logo/Logo';
import NavBarLogin from '../NavBarLogin/NavBarLogin';
import Search from '../Search/Search';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: 60,
    columnGap: 15,
    display: 'grid',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    gridTemplateColumns: '1fr minmax(auto, 700px) 1fr',
    backgroundColor: theme.palette.background.paper,
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.menu}>
        <ButtonMenu
          onClick={() => openDrawerVar(true)}
          aria-label="menu"
          color="secondary"
        >
          <MenuIcon />
        </ButtonMenu>
        <Logo />
      </Box>
      <Search />
      <NavBarLogin />
    </Box>
  );
};

export default NavBar;
