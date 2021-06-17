import React from 'react';
import useEntriesItemStyle from './EntriesItemStyles';
import NextLink from 'next/link';
import { Link } from '@material-ui/core';
import { EntryFragmentFragment } from '../../generated/graphql';
import { polishPlurals } from 'polish-plurals';

const EntriesItemComments = ({
  data,
}: {
  data: EntryFragmentFragment;
}): JSX.Element => {
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
        {data.commentsNumber ? data.commentsNumber : 0}
        {polishPlurals(
          ' komentarz',
          ' komentarze',
          ' komentarzy',
          data.commentsNumber
        )}
      </Link>
    </NextLink>
  );
};

export default EntriesItemComments;
