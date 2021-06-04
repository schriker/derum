import { Box, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { openDrawerVar } from '../../lib/apolloVars';
import { ButtonMenu } from '../Buttons/ButtonMenu';
import MenuIcon from '../Icons/MenuIcon';
import NavBarLogin from '../NavBarLogin/NavBarLogin';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: 60,
    display: 'grid',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    gridTemplateColumns: 'auto 2fr 1fr',
    backgroundColor: theme.palette.grey[900],
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    justifySelf: 'center',
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
      </Box>
      <Box className={classes.search}>Wyszukiwarka</Box>
      <NavBarLogin />
    </Box>
  );
};

export default NavBar;
