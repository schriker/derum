import React from 'react';
import NextLink from 'next/link';
import { CardActionArea, CardMedia } from '@material-ui/core';
import useEntriesItemStyle from './EntriesItemStyles';
import { EntiresItemTitleProps } from '../../types/entries';

const EntriesItemTitle = ({ link, image, title }: EntiresItemTitleProps) => {
  const classes = useEntriesItemStyle();

  return (
    <NextLink href={link} passHref>
      <CardActionArea component="a" className={classes.action}>
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

export default EntriesItemTitle;
