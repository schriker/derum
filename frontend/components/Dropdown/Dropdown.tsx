import { Menu, MenuProps, Theme, withStyles } from '@material-ui/core';
import React from 'react';

const Dropdown = withStyles((theme: Theme) => ({
  paper: {
    maxWidth: 320,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 300,
    },
  },
}))((props: MenuProps) => (
  <Menu
    elevation={8}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default Dropdown;
