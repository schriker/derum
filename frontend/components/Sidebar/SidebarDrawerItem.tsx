import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { SidebarDrawerItemProps } from '../../types/sidebar';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import UserAvatar from '../UserAvatar/UserAvatar';
import useSidebarStyles from './SidebarStyles';

const SidebarDrawerItem = ({ name, usersNumber }: SidebarDrawerItemProps) => {
  const classes = useSidebarStyles();

  return (
    <ButtonPrimary className={classes.button}>
      <Box display="flex" alignItems="center">
        <UserAvatar name={name} src={null} className={classes.photo} />
        <Typography variant="body1">{name}</Typography>
        <Typography className={classes.userNumber} variant="subtitle2">
          {usersNumber}
        </Typography>
      </Box>
    </ButtonPrimary>
  );
};

export default SidebarDrawerItem;
