import { Box, Typography } from '@material-ui/core';
import React from 'react';
import trimString from '../../helpers/trimString';
import { SearchCommentsListProps } from '../../types/search';
import CommentsItem from '../CommentsItem/CommentsItem';
import useSearchListStyles from './SearchListStyles';

const SearchCommentsList = ({ comments }: SearchCommentsListProps) => {
  const classes = useSearchListStyles();

  return comments.length ? (
    <Box>
      <Typography variant="subtitle1" className={classes.sectionTitle}>
        Komentarze
      </Typography>
      {comments.map((comment) => (
        <CommentsItem
          level={0}
          searchView
          entryId={comment.entry.id}
          entryIsDeleted={comment.entry.deleted}
          key={comment.id}
          data={{
            ...comment,
            body: trimString(comment.body, 150),
            childrens: [],
          }}
        />
      ))}
    </Box>
  ) : null;
};

export default SearchCommentsList;
