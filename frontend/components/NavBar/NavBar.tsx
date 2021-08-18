import { Box, Hidden, makeStyles, Theme } from '@material-ui/core';
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
    gridTemplateColumns: 'auto minmax(auto, 700px) auto',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
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
      <Hidden smDown>
        <Search />
      </Hidden>
      <NavBarLogin />
    </Box>
  );
};

export default NavBar;
