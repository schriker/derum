import React from 'react';
import { Link } from '@material-ui/core';
import { EntriesItemAuthorProps } from '../../types/entries';

const EntriesItemAuthor = ({
  handleUserClick,
  name,
  color,
  id,
}: EntriesItemAuthorProps): JSX.Element => {
  return (
    <Link
      onClick={() => handleUserClick(id)}
      style={{ marginRight: 10, color: color }}
      component="button"
      variant="subtitle1"
      color="textPrimary"
    >
      {name}
    </Link>
  );
};

export default EntriesItemAuthor;
