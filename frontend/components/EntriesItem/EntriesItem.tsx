import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActionArea,
  Link,
} from '@material-ui/core';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';
import { EntriesItemProps } from '../../types/entries';
import useEntriesItemStyle from './EntriesItemStyles';

const EntriesItem = ({ data, handleUserClick }: EntriesItemProps) => {
  const classes = useEntriesItemStyle();
  const link = `/p/${data.room.name}/w/${data.slug}`;
  const roomLink = `/p/${data.room.name}`;
  return (
    <Card className={classes.wrapper} elevation={0}>
      <CardContent className={classes.vote}>Plusy</CardContent>
      <NextLink href={link} passHref>
        <CardActionArea component="a" className={classes.action}>
          <CardMedia
            component="img"
            className={classes.photo}
            image={data.photo.url}
            title={data.title}
          />
        </CardActionArea>
      </NextLink>
      <CardContent>
        <NextLink href={link} passHref>
          <Link variant="h5" color="textPrimary">
            {data.title}
          </Link>
        </NextLink>
        <Box className={classes.info}>
          <Link
            onClick={() => handleUserClick(data.author.id)}
            style={{ marginRight: 10, color: '#FF026A' }}
            component="button"
            variant="body1"
            color="textPrimary"
          >
            {data.author.displayName}
          </Link>
          <Typography variant="body2" color="textSecondary">
            {dayjs(data.createdAt).format('DD.MM.YYYY - HH:mm')}
          </Typography>
          <NextLink href={roomLink} passHref>
            <Link
              variant="body2"
              style={{ marginRight: 10 }}
              color="textSecondary"
            >
              p/{data.room.name}
            </Link>
          </NextLink>
          <Chip
            size="small"
            label={
              <Link
                target="_blank"
                color="secondary"
                rel="noopener"
                href={data.url}
              >
                {data.publisher}
              </Link>
            }
          />
        </Box>
        <Typography variant="body2" className={classes.description}>
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EntriesItem;
