import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { SearchEntriesListProps } from '../../types/search';
import EntriesItem from '../EntriesItem/EntriesItem';
import useSearchListStyles from './SearchListStyles';

const SearchEntriesList = ({ entries }: SearchEntriesListProps) => {
  const classes = useSearchListStyles();

  return entries.length ? (
    <Box mb={1}>
      <Typography variant="subtitle1" className={classes.sectionTitle}>
        Wpisy
      </Typography>
      {entries.map((entry) => (
        <EntriesItem searchView data={entry} key={entry.id} preview={true} />
      ))}
    </Box>
  ) : null;
};

export default SearchEntriesList;
