import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Chat from '../components/Chat/Chat';
import Entries from '../components/Entries/Entires';
import EntriesSort from '../components/EntriesSort/EntiresSort';
import EntriesWrapper from '../components/EntriesWrapper/EntriesWrapper';
import Layout from '../components/Layout/Layout';
import RoomAddContentButtons from '../components/RoomAddContentButtons/RoomAddContentButtons';
import RoomHeader from '../components/RoomHeader/RoomHeader';
import { indexRoomVars, PAGE_LIMIT } from '../consts';
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
} from '../generated/graphql';
import useRoomData from '../hooks/useRoomData';
import useRoomEntries from '../hooks/useRoomEntries';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import Custom404 from './404';

export default function Index(): JSX.Element {
  const router = useRouter();
  const { roomData } = useRoomData();
  const { hasMore, entriesData, ref } = useRoomEntries();

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
  const apolloClient = initializeApollo(null, context.req.headers);
  await apolloClient.query<MeQuery, MeQueryVariables>({
    query: MeDocument,
    errorPolicy: 'ignore',
  });

  await apolloClient.query<RoomQuery, RoomQueryVariables>({
    query: RoomDocument,
    variables: {
      name: indexRoomVars.name,
    },
  });

  const sort = context.params.sort
    ? EntrySort[context.params.sort[0].toUpperCase()]
    : EntrySort.NEW;

  await apolloClient.query<EntriesQuery, EntriesQueryVariables>({
    query: EntriesDocument,
    variables: {
      queryData: {
        offset: 0,
        limit: PAGE_LIMIT,
        sort: sort ? sort : EntrySort.NEW,
        roomName: indexRoomVars.name,
      },
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
