import { Menu, MenuProps, withStyles } from '@material-ui/core';
import React from 'react';

const Dropdown = withStyles({
  paper: {},
})((props: MenuProps) => (
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
