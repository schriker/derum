import { Chip, Link } from '@material-ui/core';
import React from 'react';
import { EntriesPublisherProps } from '../../types/entries';
import useEntriesItemStyle from './EntriesItemStyles';

const EntiresItemPublisher = ({ publisher, url }: EntriesPublisherProps) => {
  const classes = useEntriesItemStyle({
    searchView: false,
  });

  return (
    <Chip
      className={classes.publisher}
      size="small"
      label={
        url ? (
          <Link target="_blank" color="secondary" rel="noreferrer" href={url}>
            {publisher}
          </Link>
        ) : (
          publisher
        )
      }
    />
  );
};

export default EntiresItemPublisher;
