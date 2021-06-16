import { Box } from '@material-ui/core';
import React from 'react';
import { VoteValueEnum } from '../../generated/graphql';
import { CommentItemPropsType } from '../../types/comment';
import Markdown from '../Markdown/Markdown';
import Vote from '../Vote/Vote';
import CommentsItemHeader from './CommentsItemHeader';
import useCommentsItemStyles from './CommentsItemStyles';

const CommentsItem = (props: CommentItemPropsType) => {
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
      </Box>
    </Box>
  );
};

export default CommentsItem;
