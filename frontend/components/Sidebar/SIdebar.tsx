import { Box } from '@material-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { openDrawerVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import PlusIcon from '../Icons/PlusIcon';
import RoomAvatar from '../RoomAvatarSidebar/RoomAvatarSidebar';
import DarkTooltip from '../Tooltip/Tooltip';
import SidebarHomeLink from './SidebarHomeLink';

const Sidebar = () => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  return (
    <Box
      width={60}
      pt={1}
      flexShrink={0}
      bgcolor="background.paper"
      display="flex"
      alignItems="center"
      flexDirection="column"
      className="scrollbar"
      style={{ overflow: 'auto' }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        flexGrow="1"
      >
        <SidebarHomeLink />
        {data
          ? data.me.joinedRooms.map((room) => (
              <RoomAvatar key={room.id} name={room.name} />
            ))
          : null}
      </Box>
      <Box py={1} onClick={() => openDrawerVar(true)}>
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
