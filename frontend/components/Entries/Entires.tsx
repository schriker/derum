import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { PAGE_LIMIT } from '../../consts';
import { EntriesQuery } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import EntriesEmpty from '../EntriesEmpty/EntriesEmpty';
import EntriesItem from '../EntriesItem/EntriesItem';
import EntiresItemLoading from '../EntriesItemLoading/EntriesItemLoading';
import UserModal from '../UserModal/UserModal';
import useEntriesStyles from './EntriesStyles';

const Entries = React.forwardRef<
  HTMLDivElement,
  {
    entriesData: EntriesQuery;
    hasMore: boolean;
  }
>(({ entriesData, hasMore }, ref) => {
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
              preview
              handleUserClick={handlerUserClick}
              key={entry.id}
              data={entry}
            />
          ))
        )}
        <div style={{ height: 3 }} ref={ref}></div>
        {hasMore &&
          !!entriesData.entries.length &&
          entriesData.entries.length >= PAGE_LIMIT && <EntiresItemLoading />}
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
});

export default Entries;

Entries.displayName = 'Entries';
