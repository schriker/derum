import { Box, Card, CardContent, Link, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';
import { EntriesItemProps } from '../../types/entries';
import EntiresItemPublisher from './EntriesItemPublisher';
import EntriesItemRoom from './EntriesItemRoom';
import useEntriesItemStyle from './EntriesItemStyles';
import EntriesItemVote from './EntriesItemVote';
import EntriesItemPhoto from './EntriesItemPhoto';
import EntriesItemActions from '../EntryItemActions/EntriesItemActions';
import EntriesItemComments from './EntriesItemComments';
import UsernameWithModal from '../UsernameWithModal/UsernameWithModal';
import CommentsIcon from '../Icons/CommentsIcon';

const EntriesItem = ({
  data,
  fullView = false,
  preview,
  searchView = false,
}: EntriesItemProps) => {
  const classes = useEntriesItemStyle({
    searchView,
  });
  const roomLink = `/p/${data.room.name}`;
  const link =
    preview || !data.url
      ? `/p/${data.room.name}/w/${data.id}/${data.slug}`
      : data.url;
  return (
    <Card className={classes.wrapper} elevation={0}>
      <Box className={classes.vote}>
        {!data.deleted && !searchView && (
          <EntriesItemVote
            data={data}
            userVote={data.userVote}
            voteScore={data.voteScore}
            id={data.id}
          />
        )}
      </Box>
      <Box className={classes.contentWrapper}>
        {data.photo && (
          <EntriesItemPhoto
            link={link}
            title={data.title}
            fullView={fullView}
            image={data.photo.url}
            searchView={searchView}
          />
        )}
        <CardContent className={classes.content}>
          {data.deleted ? (
            <Box className={classes.deleted}>
              <Typography variant="body2" color="textSecondary">
                Wpis został usunięty.
              </Typography>
              <EntriesItemActions entryData={data} />
            </Box>
          ) : (
            <>
              <NextLink href={link} passHref>
                <Link
                  target={fullView ? '_blank' : '_self'}
                  rel="noreferrer"
                  variant="h5"
                  className={classes.title}
                  color="textPrimary"
                >
                  {data.title}
                </Link>
              </NextLink>
              {!searchView && (
                <Box className={classes.info}>
                  {data.author && <UsernameWithModal data={data.author} />}
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    title={dayjs(data.createdAt).format('DD.MM.YYYY - HH:mm')}
                  >
                    {dayjs().to(dayjs(data.createdAt))}
                  </Typography>
                  {data.publisher && (
                    <EntiresItemPublisher
                      publisher={data.publisher}
                      url={data.url}
                    />
                  )}
                  <EntriesItemActions entryData={data} />
                </Box>
              )}
              {!searchView && (
                <Typography variant="body2" className={classes.description}>
                  {data.description}
                </Typography>
              )}
              <Box className={classes.info}>
                <CommentsIcon className={classes.commentIcon} />
                <EntriesItemComments data={data} />
                <EntriesItemRoom link={roomLink} name={data.room.name} />
              </Box>
            </>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};

const areEqual = (prevProps: EntriesItemProps, nextProps: EntriesItemProps) => {
  if (
    prevProps.data.deleted !== nextProps.data.deleted ||
    prevProps.data.userVote !== nextProps.data.userVote ||
    prevProps.data.voteScore !== nextProps.data.voteScore
  )
    return false;
  return true;
};

export default React.memo(EntriesItem, areEqual);
