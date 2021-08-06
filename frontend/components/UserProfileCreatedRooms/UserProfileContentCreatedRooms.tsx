import { Box } from '@material-ui/core';
import React from 'react';
import { UserProfileContentCreatedRoomsProps } from '../../types/userProfile';
import EntriesEmpty from '../EntriesEmpty/EntriesEmpty';
import SidebarDrawerSection from '../Sidebar/SidebarDrawerSection';
import useUserProfileContentCreatedRoomsStyles from './UserProfileContentCreatedRoomsStyles';

const UserProfileContentCreatedRooms = ({
  data,
}: UserProfileContentCreatedRoomsProps) => {
  const classes = useUserProfileContentCreatedRoomsStyles();

  return (
    <Box className={classes.wrapper}>
      <SidebarDrawerSection
        sectionData={data.user.createdRooms}
        title="Pokoje użytkownika"
      />
      {!data.user.createdRooms.length && <EntriesEmpty />}
    </Box>
  );
};

export default UserProfileContentCreatedRooms;
