import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { openDrawerVar } from '../../lib/apolloVars';
import RoomSearchInput from '../RoomSearchInput/RoomSearchInput';

const SidebarDrawerSearch = () => {
  const router = useRouter();

  const clickHandler = (_, name: string) => {
    router.push(`/p/${name}`);
    openDrawerVar(false);
  };

  return (
    <Box px={1}>
      <RoomSearchInput placeholder="Szukaj pokoju" onSelect={clickHandler} />
    </Box>
  );
};

export default SidebarDrawerSearch;
