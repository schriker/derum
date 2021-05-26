import { useReactiveVar } from '@apollo/client';
import { Drawer } from '@material-ui/core';
import React from 'react';
import { openDrawerVar } from '../../lib/apolloVars';

const SidebarDrawer = () => {
  const isOpen = useReactiveVar(openDrawerVar);

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => openDrawerVar(false)}>
      asd
    </Drawer>
  );
};

export default SidebarDrawer;
