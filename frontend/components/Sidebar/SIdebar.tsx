import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Link from 'next/link';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import HomeIcon from '../Icons/HomeIcon';

const Sidebar = () => {
  return (
    <Box
      width={60}
      pt={1}
      bgcolor="background.paper"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Link href="/">
        <ButtonIcon color="secondary">
          <HomeIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      </Link>
      <Skeleton
        style={{ marginTop: 10 }}
        variant="circle"
        width={40}
        height={40}
      />
    </Box>
  );
};

export default Sidebar;
