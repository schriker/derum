import React from 'react';
import NextLink from 'next/link';
import { CardActionArea, CardMedia } from '@material-ui/core';
import useEntriesItemStyle from './EntriesItemStyles';
import { EntiresItemTitleProps } from '../../types/entries';

const EntriesItemPhoto = ({
  link,
  image,
  title,
  fullView,
  searchView,
}: EntiresItemTitleProps) => {
  const classes = useEntriesItemStyle({
    searchView,
  });

  return (
    <NextLink href={link} passHref>
      <CardActionArea
        target={fullView ? '_blank' : '_self'}
        rel="noreferrer"
        component="a"
        className={classes.action}
      >
        <CardMedia
          component="img"
          className={classes.photo}
          image={image}
          title={title}
        />
      </CardActionArea>
    </NextLink>
  );
};

export default EntriesItemPhoto;
