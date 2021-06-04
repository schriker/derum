import React from 'react';
import NextLink from 'next/link';
import { Link } from '@material-ui/core';
import { EntiresItemRoomProps } from '../../types/entries';

const EntriesItemRoom = ({ link, name }: EntiresItemRoomProps) => {
  return (
    <NextLink href={link} passHref>
      <Link variant="body2" style={{ marginRight: 10 }} color="textSecondary">
        p/{name}
      </Link>
    </NextLink>
  );
};

export default EntriesItemRoom;
