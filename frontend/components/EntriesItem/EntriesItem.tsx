import { Box, Card, CardContent, Link, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';
import { EntriesItemProps } from '../../types/entries';
import EntriesItemAuthor from './EntriesItemAuthor';
import EntiresItemPublisher from './EntriesItemPublisher';
import EntriesItemRoom from './EntriesItemRoom';
import useEntriesItemStyle from './EntriesItemStyles';
import EntriesItemVote from './EntriesItemVote';
import EntriesItemPhoto from './EntriesItemPhoto';
import EntriesItemActions from '../EntryItemActions/EntriesItemActions';

const EntriesItem = ({ data, handleUserClick }: EntriesItemProps) => {
  const classes = useEntriesItemStyle();
  const roomLink = `/p/${data.room.name}`;
  const link = `/p/${data.room.name}/${data.id}/${data.slug}`;
  return (
    <Card className={classes.wrapper} elevation={0}>
      <EntriesItemVote
        data={data}
        userVote={data.userVote}
        voteScore={data.voteScore}
        id={data.id}
      />
      {data.photo && (
        <EntriesItemPhoto
          link={link}
          image={data.photo.url}
          title={data.title}
        />
      )}
      <CardContent>
        <NextLink href={link} passHref>
          <Link variant="h5" color="textPrimary">
            {data.title}
          </Link>
        </NextLink>
        <Box className={classes.info}>
          <EntriesItemAuthor
            id={data.author.id}
            name={data.author.displayName}
            color="#FF026A"
            handleUserClick={handleUserClick}
          />
          <Typography variant="body2" color="textSecondary">
            {dayjs(data.createdAt).format('DD.MM.YYYY - HH:mm')}
          </Typography>
          <EntriesItemRoom link={roomLink} name={data.room.name} />
          {data.publisher && (
            <EntiresItemPublisher publisher={data.publisher} url={data.url} />
          )}
          <EntriesItemActions entryData={data} />
        </Box>
        <Typography variant="body2" className={classes.description}>
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EntriesItem;
