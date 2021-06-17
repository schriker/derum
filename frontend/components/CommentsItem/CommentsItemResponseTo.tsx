import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { ButtonText } from '../Buttons/ButtonText';
import { MapedComments } from '../../types/comment';
import useCommentsItemStyles from './CommentsItemStyles';
import { CommentFragmentFragmentDoc } from '../../generated/graphql';
import { Popover, Typography } from '@material-ui/core';

const CommentsItemResponseTo = ({
  data,
}: {
  data: MapedComments;
}): JSX.Element => {
  const apolloClient = useApolloClient();
  const classes = useCommentsItemStyles({
    userColor: '#FF026A',
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [parentComment, setParentComment] = useState<MapedComments>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    const parentComment = apolloClient.readFragment({
      id: `Comment:${data.parentId}`,
      fragment: CommentFragmentFragmentDoc,
      fragmentName: 'CommentFragment',
    });
    setParentComment(parentComment);
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
          <Typography
            className={classes.popover}
            variant="body2"
            color="textPrimary"
          >
            W odpowiedzi do: {parentComment.body}
          </Typography>
        </Popover>
      )}
      <ButtonText
        onClick={handleClick}
        className={classes.replyButton}
        size="small"
      >
        #{data.parentId}
      </ButtonText>
    </>
  );
};

export default CommentsItemResponseTo;
