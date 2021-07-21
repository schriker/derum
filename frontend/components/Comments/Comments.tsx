import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCommentsQuery, useMeQuery } from '../../generated/graphql';
import createCommentTree from '../../helpers/createCommentsTree';
import CommentNewForm from '../CommentNewForm/CommentNewForm';
import CommentsItem from '../CommentsItem/CommentsItem';
import EntryBodyLoading from '../EntryBodyLoading/EntryBodyLoading';
import CommentsEmpty from './CommentsEmpty';
import useCommentsStyles from './CommentsStyles';

const Comments = ({ entryIsDeleted }: { entryIsDeleted: boolean }) => {
  const router = useRouter();
  const entryId = parseInt(router.query.id[0]);
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useCommentsStyles();
  const [parentId, setParentId] = useState(null);
  const { data, loading, refetch } = useCommentsQuery({
    variables: {
      entryId,
    },
  });

  useEffect(() => {
    const refetchComments = () => {
      refetch({
        entryId,
      });
    };
    if (router.events) {
      router.events.on('routeChangeComplete', refetchComments);
    }
    return () => {
      if (router.events) {
        router.events.off('routeChangeComplete', refetchComments);
      }
    };
  }, [router.events, refetch, entryId]);

  return (
    <Box id="comments" className={classes.wrapper}>
      {userData && !entryIsDeleted && (
        <CommentNewForm setParentId={setParentId} entryId={entryId} />
      )}
      {loading && <EntryBodyLoading />}
      {!!data?.comments.length &&
        createCommentTree(data).map((comment) => (
          <CommentsItem
            level={0}
            entryId={entryId}
            parentId={parentId}
            entryIsDeleted={entryIsDeleted}
            setParentId={setParentId}
            key={comment.id}
            data={comment}
          />
        ))}
      {!loading && data?.comments.length === 0 && <CommentsEmpty />}
    </Box>
  );
};

export default Comments;
