import { Box } from '@material-ui/core';
import React from 'react';
import { PAGE_LIMIT } from '../../consts';
import { useUserEntriesQuery } from '../../generated/graphql';
import useInfiniteScrollFetchUserProfileData from '../../hooks/useInfiniteScrollFetchUserProfileData';
import EntriesEmpty from '../EntriesEmpty/EntriesEmpty';
import EntriesItem from '../EntriesItem/EntriesItem';
import EntiresItemLoading from '../EntriesItemLoading/EntriesItemLoading';
import useUserProfileEntriesStyles from './UserProfileEntriesStyles';

const UserProfileEntries = () => {
  const classes = useUserProfileEntriesStyles();
  const { hasMore, ref, data } =
    useInfiniteScrollFetchUserProfileData(useUserEntriesQuery);

  return data ? (
    <Box className={classes.wrapper}>
      {!data.userEntries.length ? (
        <EntriesEmpty />
      ) : (
        data.userEntries.map((entry) => (
          <EntriesItem preview key={entry.id} data={entry} />
        ))
      )}
      <div style={{ height: 3 }} ref={ref}></div>
      {hasMore && data.userEntries.length >= PAGE_LIMIT && (
        <EntiresItemLoading />
      )}
    </Box>
  ) : (
    <Box className={classes.wrapper}>
      <EntiresItemLoading />
    </Box>
  );
};

export default UserProfileEntries;
