import { useState } from 'react';
import { EntryQuery } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import EntriesItem from '../EntriesItem/EntriesItem';
import UserModal from '../UserModal/UserModal';
import EntryBody from './EntryBody';
import Comments from '../Comments/Comments';

const SingleEntry = ({ data }: { data: EntryQuery }): JSX.Element => {
  const [userId, setUserId] = useState(null);
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();

  const handlerUserClick = (id: number) => {
    setUserId(id);
    handleOpen();
  };

  return (
    <>
      <EntriesItem
        fullView
        data={data.entry}
        handleUserClick={handlerUserClick}
        preview={false}
      />
      {data.entry.body && <EntryBody body={data.entry.body} />}
      <Comments />
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

export default SingleEntry;
