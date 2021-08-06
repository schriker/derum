import { Box } from '@material-ui/core';
import React from 'react';
import { PAGE_LIMIT } from '../../consts';
import { EntriesQuery } from '../../generated/graphql';
import EntriesEmpty from '../EntriesEmpty/EntriesEmpty';
import EntriesItem from '../EntriesItem/EntriesItem';
import EntiresItemLoading from '../EntriesItemLoading/EntriesItemLoading';
import useEntriesStyles from './EntriesStyles';

const Entries = React.forwardRef<
  HTMLDivElement,
  {
    entriesData: EntriesQuery;
    hasMore: boolean;
  }
>(({ entriesData, hasMore }, ref) => {
  const classes = useEntriesStyles();

  return (
    <Box className={classes.wrapper}>
      {!entriesData.entries.length ? (
        <EntriesEmpty />
      ) : (
        entriesData.entries.map((entry) => (
          <EntriesItem preview key={entry.id} data={entry} />
        ))
      )}
      <div style={{ height: 3 }} ref={ref}></div>
      {hasMore && entriesData.entries.length >= PAGE_LIMIT && (
        <EntiresItemLoading />
      )}
    </Box>
  );
});

export default Entries;

Entries.displayName = 'Entries';
