import { Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { openDrawerVar } from '../../lib/apolloVars';
import { SidebarDrawerItemProps } from '../../types/sidebar';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import useSidebarStyles from './SidebarStyles';
import numbro from 'numbro';
import { ButtonBlank } from '../Buttons/ButtonBlank';

const SidebarDrawerItem = ({ name, usersNumber }: SidebarDrawerItemProps) => {
  const router = useRouter();
  const classes = useSidebarStyles({ isActive: router.query.room === name });

  const handleClick = () => {
    openDrawerVar(false);
    router.push(`/p/${name}`);
  };

  return (
    <ButtonBlank onClick={handleClick} className={classes.button}>
      <Box display="flex" alignItems="center">
        <AvatarPhoto
          color="#FF026A"
          name={name}
          src={null}
          className={classes.photo}
        />
        <Typography variant="body1">{name}</Typography>
        <Typography className={classes.userNumber} variant="subtitle2">
          {numbro(usersNumber).format({ average: true })}
        </Typography>
      </Box>
    </ButtonBlank>
  );
};

export default SidebarDrawerItem;
