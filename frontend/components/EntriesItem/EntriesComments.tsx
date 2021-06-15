import React from 'react';
import useEntriesItemStyle from './EntriesItemStyles';
import NextLink from 'next/link';
import { Link } from '@material-ui/core';
import { EntryFragmentFragment } from '../../generated/graphql';

const EntriesComments = ({ data }: { data: EntryFragmentFragment }) => {
  const classes = useEntriesItemStyle();

  return (
    <NextLink
      href={`/p/${data.room.name}/wpis/${data.id}/${data.slug}#comments`}
      passHref
    >
      <Link
        className={classes.commentsNumber}
        variant="body2"
        color="textSecondary"
      >
        {data.commentsNumber ? data.commentsNumber : 0} komentarzy
      </Link>
    </NextLink>
  );
};

export default EntriesComments;
