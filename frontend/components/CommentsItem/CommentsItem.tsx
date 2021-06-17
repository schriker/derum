import { Box } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React from 'react';
import { VoteValueEnum } from '../../generated/graphql';
import { CommentItemPropsType } from '../../types/comment';
import CommentNewForm from '../CommentNewForm/CommentNewForm';
const Markdown = dynamic(() => import('../Markdown/Markdown'));
import Vote from '../Vote/Vote';
import CommentsItemHeader from './CommentsItemHeader';
import useCommentsItemStyles from './CommentsItemStyles';

const CommentsItem = (props: CommentItemPropsType): JSX.Element => {
  const classes = useCommentsItemStyles({
    userColor: '#FF026A',
    level: props.level,
  });

  return (
    <>
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
            <Markdown>{props.data.body}</Markdown>
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
      {!!props.data.childrens.length &&
        props.data.childrens.map((comments) => (
          <CommentsItem
            key={comments.id}
            {...props}
            data={comments}
            level={props.level + 1}
          />
        ))}
    </>
  );
};

export default CommentsItem;
