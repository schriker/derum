import { Box } from '@material-ui/core';
import React from 'react';
import { VoteValueEnum } from '../../generated/graphql';
import { CommentItemPropsType } from '../../types/comment';
import CommentNewForm from '../CommentNewForm/CommentNewForm';
import Markdown from '../Markdown/Markdown';
import Vote from '../Vote/Vote';
import CommentsItemHeader from './CommentsItemHeader';
import useCommentsItemStyles from './CommentsItemStyles';

const CommentsItem = (props: CommentItemPropsType): JSX.Element => {
  const classes = useCommentsItemStyles({
    userColor: '#FF026A',
  });

  return (
    <Box className={classes.wrapper}>
      <Vote
        comments
        voteScore={0}
        userVote={VoteValueEnum.NONE}
        handleClick={() => console.log('Vote on comment')}
      />
      <Box className={classes.content}>
        <CommentsItemHeader {...props} />
        <Box className={classes.body}>
          <Markdown value={props.data.body} />
        </Box>
        {props.parentId === props.data.id && (
          <CommentNewForm
            setParentId={props.setParentId}
            entryId={props.entryId}
            parentId={props.parentId}
          />
        )}
      </Box>
    </Box>
  );
};

export default CommentsItem;
