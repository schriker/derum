import { Chip, Link } from '@material-ui/core';
import React from 'react';
import { EntriesPublisherProps } from '../../types/entries';
import useEntriesItemStyle from './EntriesItemStyles';

const EntiresItemPublisher = ({
  publisher,
  url,
}: EntriesPublisherProps): JSX.Element => {
  const classes = useEntriesItemStyle();

  return (
    <Chip
      className={classes.publisher}
      size="small"
      label={
        <Link target="_blank" color="secondary" rel="noopener" href={url}>
          {publisher}
        </Link>
      }
    />
  );
};

export default EntiresItemPublisher;
