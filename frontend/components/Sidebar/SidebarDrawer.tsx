import { useReactiveVar } from '@apollo/client';
import { Box, Drawer } from '@material-ui/core';
import React from 'react';
import {
  useMeQuery,
  useNewRoomsQuery,
  usePopularRoomsQuery,
} from '../../generated/graphql';
import { openDrawerVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import NewRoomButton from '../NewRoom/NewRoomButton';
import SidebarDrawerSearch from './SidebarDrawerSearch';
import SidebarDrawerSection from './SidebarDrawerSection';
import useSidebarDrawerStyles from './SidebarDrawerStyles';
import SidebarSkeleton from './SidebarSkeleton';

const SidebarDrawer = () => {
  const isOpen = useReactiveVar(openDrawerVar);
  const classes = useSidebarDrawerStyles();
  const { data: userData, loading: userLoading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { data: newRoomsData, loading: newRoomsLoading } = useNewRoomsQuery();
  const { data: popularRoomsData, loading: popularRoomsLoading } =
    usePopularRoomsQuery({
      variables: {
        limit: 5,
      },
    });

  return (
    <Drawer
      classes={{
        paper: classes.paper,
      }}
      anchor="left"
      open={isOpen}
      onClose={() => openDrawerVar(false)}
    >
      <Box pt={1} pb={2} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="flex-end" mr={1}>
          <ButtonIcon
            size="small"
            color="secondary"
            aria-label="close"
            onClick={() => openDrawerVar(false)}
          >
            <CloseIcon style={{ fontSize: 22 }} />
          </ButtonIcon>
        </Box>
        <SidebarDrawerSearch />
        <NewRoomButton />
        <Box mt={1} display="flex" flexDirection="column">
          {newRoomsLoading ? (
            <SidebarSkeleton />
          ) : newRoomsData ? (
            <SidebarDrawerSection
              sectionData={newRoomsData.newRooms}
              title="Nowe"
            />
          ) : null}
          {popularRoomsLoading ? (
            <SidebarSkeleton />
          ) : popularRoomsData ? (
            <SidebarDrawerSection
              sectionData={popularRoomsData.popularRooms}
              title="Popularne"
            />
          ) : null}
          {userLoading ? (
            <SidebarSkeleton />
          ) : userData?.me.createdRooms.length ? (
            <SidebarDrawerSection
              sectionData={userData.me.createdRooms}
              title="Moje"
            />
          ) : null}
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarDrawer;
