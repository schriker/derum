import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCommentsQuery, useMeQuery } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import CommentNewForm from '../CommentNewForm/CommentNewForm';
import CommentsItem from '../CommentsItem/CommentsItem';
import EntryBodyLoading from '../EntryBodyLoading/EntryBodyLoading';
import UserModal from '../UserModal/UserModal';
import useCommentsStyles from './CommentsStyles';

const Comments = () => {
  const router = useRouter();
  const entryId = parseInt(router.query.id[0]);
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useCommentsStyles();
  const [userId, setUserId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const { data, loading } = useCommentsQuery({
    fetchPolicy: 'network-only',
    variables: {
      entryId,
    },
  });

  return (
    <Box id="comments" className={classes.wrapper}>
      {userData && !parentId && <CommentNewForm entryId={entryId} />}
      {loading && <EntryBodyLoading />}
      {!!data?.comments.length &&
        data.comments.map((comment) => (
          <CommentsItem
            entryId={entryId}
            parentId={parentId}
            setParentId={setParentId}
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