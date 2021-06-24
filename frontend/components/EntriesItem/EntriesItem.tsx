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
import CommentIcon from '../Icons/CommentIcon';
import EntriesItemComments from './EntriesItemComments';
import { useMeQuery } from '../../generated/graphql';

const EntriesItem = ({
  data,
  fullView = false,
  handleUserClick,
  preview,
}: EntriesItemProps): JSX.Element => {
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useEntriesItemStyle();
  const roomLink = `/p/${data.room.name}`;
  const link =
    preview || !data.url
      ? `/p/${data.room.name}/wpis/${data.id}/${data.slug}`
      : data.url;
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
          fullView={fullView}
          link={link}
          image={data.photo.url}
          title={data.title}
        />
      )}
      <CardContent className={classes.content}>
        <NextLink href={link} passHref>
          <Link
            target={fullView ? '_blank' : '_self'}
            variant="h5"
            color="textPrimary"
          >
            {data.title}
          </Link>
        </NextLink>
        <Box className={classes.info}>
          <EntriesItemAuthor
            id={data.author.id}
            name={data.author.displayName}
            color={
              !userData || userData.me.showColorNames
                ? data.author.color
                : '#fff'
            }
            handleUserClick={handleUserClick}
          />
          <Typography variant="subtitle2" color="textSecondary">
            {dayjs(data.createdAt).format('DD.MM.YYYY - HH:mm')}
          </Typography>
          {data.publisher && (
            <EntiresItemPublisher publisher={data.publisher} url={data.url} />
          )}
          <EntriesItemActions entryData={data} />
        </Box>
        <Typography variant="body2" className={classes.description}>
          {data.description}
        </Typography>
        <Box className={classes.info}>
          <CommentIcon className={classes.commentIcon} />
          <EntriesItemComments data={data} />
          <EntriesItemRoom link={roomLink} name={data.room.name} />
        </Box>
      </CardContent>
    </Card>
  );
};

const areEqual = (prevProps: EntriesItemProps, nextProps: EntriesItemProps) => {
  if (
    prevProps.data.userVote !== nextProps.data.userVote ||
    prevProps.data.voteScore !== nextProps.data.voteScore
  )
    return false;
  return true;
};

export default React.memo(EntriesItem, areEqual);
