import { Box } from '@material-ui/core';
import React from 'react';
import { PAGE_LIMIT } from '../../consts';
import { useUserCommentsQuery } from '../../generated/graphql';
import useInfiniteScrollFetchUserProfileData from '../../hooks/useInfiniteScrollFetchUserProfileData';
import CommentsItem from '../CommentsItem/CommentsItem';
import EntriesEmpty from '../EntriesEmpty/EntriesEmpty';
import EntryBodyLoading from '../EntryBodyLoading/EntryBodyLoading';
import useUserProfileCommentsStyles from './UserProfileCommentsStyles';

const UserProfileComments = () => {
  const classes = useUserProfileCommentsStyles();
  const { hasMore, ref, data } =
    useInfiniteScrollFetchUserProfileData(useUserCommentsQuery);

  return data ? (
    <Box className={classes.wrapper}>
      {!data.userComments.length ? (
        <EntriesEmpty />
      ) : (
        data.userComments.map((comment) => (
          <CommentsItem
            level={0}
            entryId={comment.entry.id}
            entryIsDeleted={comment.entry.deleted}
            key={comment.id}
            data={{ ...comment, childrens: [] }}
          />
        ))
      )}
      <div style={{ height: 3 }} ref={ref}></div>
      {hasMore && data.userComments.length >= PAGE_LIMIT && (
        <EntryBodyLoading />
      )}
    </Box>
  ) : (
    <Box className={classes.wrapper}>
      <EntryBodyLoading />
    </Box>
  );
};

export default UserProfileComments;
