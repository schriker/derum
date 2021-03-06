import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
const Markdown = dynamic(() => import('../Markdown/Markdown'), {
  loading: function Loading() {
    return (
      <Box mt={2}>
        <Skeleton />
      </Box>
    );
  },
});
import CommentsItemVote from './CommentsItemVote';
import CommentsItemHeader from './CommentsItemHeader';
import useCommentsItemStyles from './CommentsItemStyles';
import { CommentItemPropsType } from '../../types/comment';
import CommentNewForm from '../CommentNewForm/CommentNewForm';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Skeleton } from '@material-ui/lab';

const CommentsItem = (props: CommentItemPropsType) => {
  const router = useRouter();
  const highlightedRef = useRef<HTMLDivElement>();
  const isHighlighted =
    props.data.id === parseInt(router.query.comment as string);
  const classes = useCommentsItemStyles({
    userColor: props.data.author.color,
    level: props.level,
    isHighlighted: isHighlighted,
  });

  useEffect(() => {
    if (highlightedRef.current && isHighlighted) {
      highlightedRef.current.scrollIntoView();
    }
  }, [highlightedRef, isHighlighted]);

  return (
    <div ref={highlightedRef}>
      <Box id={`comment-${props.data.id}`} className={classes.wrapper}>
        {!props.searchView && (
          <CommentsItemVote
            voteScore={props.data.voteScore}
            data={props.data}
            id={props.data.id}
            userVote={props.data.userVote}
          />
        )}
        <Box className={classes.content}>
          <CommentsItemHeader {...props} />
          <Box className={classes.body}>
            {props.data.body ? (
              <Markdown isComment>{props.data.body}</Markdown>
            ) : (
              <Typography
                className={classes.deleted}
                variant="body2"
                color="textSecondary"
              >
                Komentarz usunięty.
              </Typography>
            )}
          </Box>
          {props.parentId === props.data.id && !props.entryIsDeleted && (
            <CommentNewForm
              setParentId={props.setParentId}
              entryId={props.entryId}
              parentId={props.parentId}
            />
          )}
        </Box>
      </Box>
      {!!props.data.childrens.length &&
        props.data.childrens.map((comments) => (
          <CommentsItem
            key={comments.id}
            {...props}
            data={comments}
            level={props.level + 1}
          />
        ))}
    </div>
  );
};

export default CommentsItem;
