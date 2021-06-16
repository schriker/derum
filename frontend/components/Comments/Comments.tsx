import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCommentsQuery } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import CommentsItem from '../CommentsItem/CommentsItem';
import EntryBodyLoading from '../EntryBodyLoading/EntryBodyLoading';
import UserModal from '../UserModal/UserModal';
import useCommentsStyles from './CommentsStyles';

const Comments = () => {
  const router = useRouter();
  const classes = useCommentsStyles();
  const [userId, setUserId] = useState(null);
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const { data, loading } = useCommentsQuery({
    variables: {
      entryId: parseInt(router.query.id[0]),
    },
  });

  return (
    <Box id="comments" className={classes.wrapper}>
      {loading && <EntryBodyLoading />}
      {!!data?.comments.length &&
        data.comments.map((comment) => (
          <CommentsItem
            setUserId={setUserId}
            handleOpen={handleOpen}
            key={comment.id}
            data={comment}
          />
        ))}
      {userId && (
        <UserModal
          openModal={openModal}
          handleClose={handleClose}
          id={userId}
        />
      )}
    </Box>
  );
};

export default Comments;
