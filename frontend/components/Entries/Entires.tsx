import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { EntriesQuery } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import EntriesEmpty from '../EntriesEmpty/EntriesEmpty';
import EntriesItem from '../EntriesItem/EntriesItem';
import UserModal from '../UserModal/UserModal';
import useEntriesStyles from './EntriesStyles';

const Entries = ({ entriesData }: { entriesData: EntriesQuery }) => {
  const classes = useEntriesStyles();
  const [userId, setUserId] = useState(null);
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();

  const handlerUserClick = (id: number) => {
    setUserId(id);
    handleOpen();
  };

  return (
    <>
      <Box className={classes.wrapper}>
        {!entriesData.entries.length ? (
          <EntriesEmpty />
        ) : (
          entriesData.entries.map((entry) => (
            <EntriesItem
              handleUserClick={handlerUserClick}
              key={entry.id}
              data={entry}
            />
          ))
        )}
      </Box>
      {userId && (
        <UserModal
          openModal={openModal}
          handleClose={handleClose}
          id={userId}
        />
      )}
    </>
  );
};

export default Entries;
