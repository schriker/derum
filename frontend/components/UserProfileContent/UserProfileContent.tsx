import { Box } from '@material-ui/core';
import TabPanel from '../TabPanel/TabPanel';
import React from 'react';
import { UserProfileContentProps } from '../../types/userProfile';
import useUserProfileContentStyles from './UserProfileContentStyles';
import UserProfileEntries from '../UserProfileEntries/UserProfileEntries';
import UserProfileComments from '../UserProfileComments/UserProfileComments';
import UserProfileMessages from '../UserProfileMessages/UserProfileMessages';

const UserProfileContent = ({ tabIndex }: UserProfileContentProps) => {
  const classes = useUserProfileContentStyles();

  return (
    <Box className={classes.wrapper}>
      <TabPanel value={tabIndex} index={0}>
        <UserProfileEntries />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <UserProfileComments />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <UserProfileMessages />
      </TabPanel>
    </Box>
  );
};

export default UserProfileContent;
