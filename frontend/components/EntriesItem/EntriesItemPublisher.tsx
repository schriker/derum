import { Chip, Link } from '@material-ui/core';
import React from 'react';
import { EntriesPublisherProps } from '../../types/entries';

const EntiresItemPublisher = ({ publisher, url }: EntriesPublisherProps) => {
  return (
    <Chip
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
