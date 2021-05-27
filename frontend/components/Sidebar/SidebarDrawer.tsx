import { useReactiveVar } from '@apollo/client';
import { Box, Drawer } from '@material-ui/core';
import React, { useState } from 'react';
import {
  useNewRoomsQuery,
  usePopularRoomsQuery,
} from '../../generated/graphql';
import { openDrawerVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import CloseIcon from '../Icons/CloseIcon';
import SearchInput from '../SearchInput/SearchInput';
import SidebarDrawerSection from './SidebarDrawerSection';
import SidebarSkeleton from './SidebarSkeleton';
import useSidebarStyles from './SidebarStyles';

const SidebarDrawer = () => {
  const isOpen = useReactiveVar(openDrawerVar);
  const classes = useSidebarStyles();
  const [searchValue, setSearchValue] = useState('');
  const { data: newRoomsData, loading: newRoomsLoading } = useNewRoomsQuery();
  const { data: popularRoomsData, loading: popularRoomsLoading } =
    usePopularRoomsQuery();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => openDrawerVar(false)}>
      <Box pt={1} display="flex" height="100%" flexDirection="column">
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
        <Box display="flex" flexDirection="column" flexGrow="1" minWidth={300}>
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
          <ButtonPrimary className={classes.newRoomButton} color="primary">
            Utwórz nowy pokój
          </ButtonPrimary>
        </Box>
        <Box px={1}>
          <SearchInput
            value={searchValue}
            onChange={handleChange}
            placeholder="Szukaj pokoju"
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarDrawer;
