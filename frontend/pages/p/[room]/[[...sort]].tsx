import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Chat from '../../../components/Chat/Chat';
import Entries from '../../../components/Entries/Entires';
import EntriesSort from '../../../components/EntriesSort/EntiresSort';
import EntriesWrapper from '../../../components/EntriesWrapper/EntriesWrapper';
import Layout from '../../../components/Layout/Layout';
import RoomAddContentButtons from '../../../components/RoomAddContentButtons/RoomAddContentButtons';
import RoomHeader from '../../../components/RoomHeader/RoomHeader';
import { PAGE_LIMIT } from '../../../consts';
import {
  EntriesDocument,
  EntriesQuery,
  EntriesQueryVariables,
  EntrySort,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  useEntriesQuery,
} from '../../../generated/graphql';
import useRoomData from '../../../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../../../lib/apolloClient';
import Custom404 from '../../404';

export default function Room() {
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
    variables: {
      queryData: {
        ...vars,
        offset: 0,
        sort: router.query.sort
          ? EntrySort[router.query.sort[0].toUpperCase()]
          : EntrySort.NEW,
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
        const cursor = entriesData.entries.length
          ? entriesData.entries[entriesData.entries.length - 1].id
          : 0;
        const offset = !router.query.sort ? cursor : entriesData.entries.length;

        const { data }: { data: EntriesQuery } = await fetchMore({
          variables: {
            queryData: {
              ...vars,
              sort: router.query.sort
                ? EntrySort[router.query.sort[0].toUpperCase()]
                : EntrySort.NEW,
              offset: offset,
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
      <EntriesWrapper>
        {router.query.room && <RoomHeader />}
        <RoomAddContentButtons />
        <EntriesSort />
        {entriesData && (
          <Entries ref={ref} hasMore={hasMore} entriesData={entriesData} />
        )}
      </EntriesWrapper>
      <Chat roomId={roomData.room.id} />
    </Layout>
  ) : (
    <Custom404 />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apolloClient = initializeApollo(null, context.req.headers);
    await apolloClient.query<MeQuery, MeQueryVariables>({
      query: MeDocument,
      errorPolicy: 'ignore',
    });

    await apolloClient.query<RoomQuery, RoomQueryVariables>({
      query: RoomDocument,
      variables: {
        name: context.params.room as string,
      },
    });

    await apolloClient.query<EntriesQuery, EntriesQueryVariables>({
      query: EntriesDocument,
      variables: {
        queryData: {
          offset: 0,
          limit: PAGE_LIMIT,
          sort: context.params.sort
            ? EntrySort[context.params.sort[0].toUpperCase()]
            : EntrySort.NEW,
          roomName: context.params.room as string,
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
};
