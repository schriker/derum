import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Link from 'next/link';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { openDrawerVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import HomeIcon from '../Icons/HomeIcon';
import PlusIcon from '../Icons/PlusIcon';
import RoomAvatar from '../RoomAvatar/RoomAvatar';
import DarkTooltip from '../Tooltip/Tooltip';
import SidebarHomeLink from './SidebarHomeLink';
import SidebarSkeleton from './SidebarSkeleton';

const Sidebar = () => {
  const { data, loading } = useMeQuery();

  return (
    <Box
      width={60}
      pt={1}
      bgcolor="background.paper"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        flexGrow="1"
      >
        <SidebarHomeLink />
        {loading ? (
          <SidebarSkeleton />
        ) : data ? (
          data.me.joinedRooms.map((room) => (
            <RoomAvatar key={room.id} name={room.name} />
          ))
        ) : null}
      </Box>
      <Box my={1} onClick={() => openDrawerVar(true)}>
        <DarkTooltip title="Dodaj" enterDelay={500} placement="right">
          <ButtonIcon color="secondary">
            <PlusIcon style={{ fontSize: 16 }} />
          </ButtonIcon>
        </DarkTooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
