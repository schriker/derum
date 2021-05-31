import { useReactiveVar } from '@apollo/client';
import { Box, Drawer } from '@material-ui/core';
import React, { useState } from 'react';
import {
  useMeQuery,
  useNewRoomsQuery,
  usePopularRoomsQuery,
} from '../../generated/graphql';
import { openDrawerVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import NewRoomButton from '../NewRoom/NewRoomButton';
import SearchInput from '../SearchInput/SearchInput';
import SidebarDrawerSection from './SidebarDrawerSection';
import SidebarSkeleton from './SidebarSkeleton';

const SidebarDrawer = () => {
  const isOpen = useReactiveVar(openDrawerVar);
  const [searchValue, setSearchValue] = useState('');
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => openDrawerVar(false)}>
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
        <Box px={1}>
          <SearchInput
            style={{ marginTop: 10 }}
            value={searchValue}
            onChange={handleChange}
            placeholder="Szukaj pokoju"
          />
        </Box>
        <NewRoomButton />
        <Box mt={1} display="flex" flexDirection="column">
          {userLoading ? (
            <SidebarSkeleton />
          ) : userData ? (
            <SidebarDrawerSection
              sectionData={userData.me.joinedRooms}
              title="Moje"
            />
          ) : null}
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
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarDrawer;
