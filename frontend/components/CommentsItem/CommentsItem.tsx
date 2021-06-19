import React from 'react';
import { Box } from '@material-ui/core';
import Markdown from '../Markdown/Markdown';
import CommentsItemVote from './CommentsItemVote';
import CommentsItemHeader from './CommentsItemHeader';
import useCommentsItemStyles from './CommentsItemStyles';
import { CommentItemPropsType } from '../../types/comment';
import CommentNewForm from '../CommentNewForm/CommentNewForm';

const CommentsItem = (props: CommentItemPropsType): JSX.Element => {
  const classes = useCommentsItemStyles({
    userColor: '#FF026A',
    level: props.level,
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <CommentsItemVote
          voteScore={props.data.voteScore}
          data={props.data}
          id={props.data.id}
          userVote={props.data.userVote}
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
