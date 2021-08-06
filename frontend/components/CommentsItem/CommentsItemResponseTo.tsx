import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { ButtonText } from '../Buttons/ButtonText';
import { MapedComments } from '../../types/comment';
import useCommentsItemStyles from './CommentsItemStyles';
import {
  CommentFragmentFragmentDoc,
  useCommentLazyQuery,
} from '../../generated/graphql';
import { Popover, Typography } from '@material-ui/core';
import trimString from '../../helpers/trimString';
import { useEffect } from 'react';

const CommentsItemResponseTo = ({ data }: { data: MapedComments }) => {
  const apolloClient = useApolloClient();
  const classes = useCommentsItemStyles({
    userColor: data.author.color,
    isHighlighted: false,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [parentComment, setParentComment] = useState<MapedComments>(null);
  const [queryComment, { data: parentCommentFetched }] = useCommentLazyQuery();

  useEffect(() => {
    if (parentCommentFetched)
      setParentComment({ ...parentCommentFetched.comment, childrens: [] });
  }, [parentCommentFetched]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    const parentComment = apolloClient.readFragment({
      id: `Comment:${data.parentId}`,
      fragment: CommentFragmentFragmentDoc,
      fragmentName: 'CommentFragment',
    });
    if (!parentComment) {
      queryComment({
        variables: {
          commentId: data.parentId,
        },
      });
    } else {
      setParentComment(parentComment);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {parentComment && (
        <Popover
          elevation={2}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          {parentComment.body ? (
            <Typography
              className={classes.popover}
              variant="body2"
              color="textPrimary"
            >
              Odpowiedź do: {trimString(parentComment.body, 70)}
            </Typography>
          ) : (
            <Typography
              className={classes.popover}
              variant="body2"
              color="textSecondary"
            >
              Komentarz usunięty.
            </Typography>
          )}
        </Popover>
      )}
      <ButtonText style={{ marginLeft: 8 }} onClick={handleClick} size="small">
        #{data.parentId}
      </ButtonText>
    </>
  );
};

export default CommentsItemResponseTo;
