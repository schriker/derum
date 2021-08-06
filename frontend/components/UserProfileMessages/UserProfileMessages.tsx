import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { PAGE_LIMIT } from '../../consts';
import { useUserMessagesQuery } from '../../generated/graphql';
import useInfiniteScrollFetchUserProfileData from '../../hooks/useInfiniteScrollFetchUserProfileData';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import ChatMessagesItem from '../ChatMessages/ChatMessagesItem';
import EntriesEmpty from '../EntriesEmpty/EntriesEmpty';
import EntryBodyLoading from '../EntryBodyLoading/EntryBodyLoading';
import UserModal from '../UserModal/UserModal';
import useUserProfileMessagesStyles from './UserProfileMessagesStyles';

const UserProfileMessages = () => {
  const [userId, setUserId] = useState(null);
  const classes = useUserProfileMessagesStyles();
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const { hasMore, ref, data } =
    useInfiniteScrollFetchUserProfileData(useUserMessagesQuery);

  return data ? (
    <Box className={classes.wrapper}>
      {!data.userMessages.length ? (
        <EntriesEmpty />
      ) : (
        data.userMessages.map((message) => (
          <ChatMessagesItem
            isUserProfileView
            userId={userId}
            setUserId={setUserId}
            handleOpen={handleOpen}
            message={message}
            key={message.id}
          />
        ))
      )}
      <div style={{ height: 3 }} ref={ref}></div>
      {hasMore && data.userMessages.length >= PAGE_LIMIT && (
        <EntryBodyLoading />
      )}
      {userId && (
        <UserModal
          openModal={openModal}
          handleClose={handleClose}
          id={userId}
        />
      )}
    </Box>
  ) : (
    <Box className={classes.wrapper}>
      <EntryBodyLoading />
    </Box>
  );
};

export default UserProfileMessages;
