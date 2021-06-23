import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCommentsQuery, useMeQuery } from '../../generated/graphql';
import createCommentTree from '../../helpers/createCommentsTree';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import CommentNewForm from '../CommentNewForm/CommentNewForm';
import CommentsItem from '../CommentsItem/CommentsItem';
import EntryBodyLoading from '../EntryBodyLoading/EntryBodyLoading';
import UserModal from '../UserModal/UserModal';
import CommentsEmpty from './CommentsEmpty';
import useCommentsStyles from './CommentsStyles';

const Comments = (): JSX.Element => {
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
    nextFetchPolicy: 'cache-only',
    variables: {
      entryId,
    },
  });

  return (
    <Box id="comments" className={classes.wrapper}>
      {userData && !parentId && <CommentNewForm entryId={entryId} />}
      {loading && <EntryBodyLoading />}
      {!!data?.comments.length &&
        createCommentTree(data).map((comment) => (
          <CommentsItem
            level={0}
            entryId={entryId}
            parentId={parentId}
            setParentId={setParentId}
            setUserId={setUserId}
            handleOpen={handleOpen}
            key={comment.id}
            data={comment}
          />
        ))}
      {!loading && data?.comments.length === 0 && <CommentsEmpty />}
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
