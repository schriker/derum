import { Box } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React from 'react';
import EntryBodyLoading from '../EntryBodyLoading/EntryBodyLoading';
import useEntryStyles from './EntryStyles';
const Markdown = dynamic(() => import('../Markdown/Markdown'), {
  loading: function Loading() {
    return <EntryBodyLoading />;
  },
});

const EntryBody = ({ body }: { body: string }) => {
  const classes = useEntryStyles();

  return (
    <Box className={classes.bodyWrapper}>
      <Markdown>{body}</Markdown>
    </Box>
  );
};

export default EntryBody;
