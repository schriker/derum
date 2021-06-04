import { Box, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Chat from '../../components/Chat/Chat';
import Entries from '../../components/Entries/Entires';
import EntriesSort from '../../components/EntriesSort/EntiresSort';
import Layout from '../../components/Layout/Layout';
import RoomAddContentButtons from '../../components/RoomAddContentButtons/RoomAddContentButtons';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import {
  EntriesDocument,
  EntriesQuery,
  EntriesQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  useEntriesQuery,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import Custom404 from '../404';

export const PAGE_LIMIT = 7;

const useStyles = makeStyles((theme: Theme) => ({
  contentWrapper: {
    flex: '1 1 calc(100% - 60px)',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1),
    overflowY: 'auto',
  },
}));

export default function Room() {
  const classes = useStyles();
  const router = useRouter();
  const [hasMore, setHasMore] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { roomData } = useRoomData();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const vars = {
    roomName: router.query.room as string,
    limit: PAGE_LIMIT,
  };
  const { data: entriesData, fetchMore } = useEntriesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      queryData: {
        ...vars,
        offset: 0,
      },
    },
  });

  useEffect(() => {
    setHasMore(true);
    setIsInView(false);
    () => {
      setHasMore(false);
      setIsInView(true);
    };
  }, [router.query.room]);

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  useEffect(() => {
    const fetchMoreData = async () => {
      if (isInView && hasMore) {
        const { data } = await fetchMore({
          variables: {
            queryData: {
              ...vars,
              offset: entriesData.entries.length,
            },
          },
        });
        if (!data.entries.length) setHasMore(false);
      }
    };

    fetchMoreData();
  }, [isInView, hasMore]);

  return roomData ? (
    <Layout
      title={roomData.room.name}
      ogDescription={roomData.room.description}
    >
      <Box className={`scrollbar ${classes.contentWrapper}`}>
        {router.query.room && <RoomHeader />}
        <RoomAddContentButtons />
        <EntriesSort />
        {entriesData && (
          <Entries ref={ref} hasMore={hasMore} entriesData={entriesData} />
        )}
      </Box>
      <Chat roomId={roomData.room.id} />
    </Layout>
  ) : (
    <Custom404 />
  );
}

export async function getServerSideProps(context) {
  try {
    const apolloClient = initializeApollo();
    await apolloClient.query<RoomQuery, RoomQueryVariables>({
      query: RoomDocument,
      variables: {
        name: context.params.room,
      },
    });

    await apolloClient.query<EntriesQuery, EntriesQueryVariables>({
      query: EntriesDocument,
      variables: {
        queryData: {
          roomName: context.params.room,
          limit: PAGE_LIMIT,
          offset: 0,
        },
      },
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (e) {
    return {
      props: {},
    };
  }
}
