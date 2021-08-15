import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Chat from '../../../../components/Chat/Chat';
import EntriesWrapper from '../../../../components/EntriesWrapper/EntriesWrapper';
import SingleEntry from '../../../../components/Entry/Entry';
import Layout from '../../../../components/Layout/Layout';
import { indexRoomVars, PAGE_LIMIT } from '../../../../consts';
import {
  EntriesDocument,
  EntriesQuery,
  EntriesQueryVariables,
  EntryDocument,
  EntryQuery,
  EntryQueryVariables,
  EntrySort,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  useEntryQuery,
} from '../../../../generated/graphql';
import useRoomData from '../../../../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../../../../lib/apolloClient';
import Custom404 from '../../../404';

export default function Entry() {
  const router = useRouter();
  const { roomData } = useRoomData();
  const { data } = useEntryQuery({
    variables: {
      entryId: parseInt(router.query.id[0]),
    },
  });

  return roomData && data ? (
    <Layout
      title={data.entry.title}
      ogImage={data.entry.photo?.url}
      ogDescription={data.entry.description}
    >
      <EntriesWrapper>
        <SingleEntry data={data} />
      </EntriesWrapper>
      <Chat roomId={roomData.room.id} />
    </Layout>
  ) : (
    <Custom404 />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const [entryId] = context.params.id as string[];
    const apolloClient = initializeApollo(null);
    await apolloClient.query<MeQuery, MeQueryVariables>({
      query: MeDocument,
      errorPolicy: 'ignore',
    });

    await apolloClient.query<EntryQuery, EntryQueryVariables>({
      query: EntryDocument,
      variables: {
        entryId: parseInt(entryId),
      },
    });

    await apolloClient.query<RoomQuery, RoomQueryVariables>({
      query: RoomDocument,
      variables: {
        name: context.params.room as string,
      },
    });

    return addApolloState(apolloClient, {
      props: {},
      revalidate: 30,
    });
  } catch (e) {
    return {
      props: {},
      revalidate: 30,
    };
  }
};

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo(null);

  const newEntries = await apolloClient.query<
    EntriesQuery,
    EntriesQueryVariables
  >({
    query: EntriesDocument,
    variables: {
      queryData: {
        offset: 0,
        limit: PAGE_LIMIT,
        sort: EntrySort.NEW,
        roomName: indexRoomVars.name,
      },
    },
  });

  const bestEntires = await apolloClient.query<
    EntriesQuery,
    EntriesQueryVariables
  >({
    query: EntriesDocument,
    variables: {
      queryData: {
        offset: 0,
        limit: PAGE_LIMIT,
        sort: EntrySort.NEW,
        roomName: indexRoomVars.name,
      },
    },
  });

  const paths = [...newEntries.data.entries, ...bestEntires.data.entries].map(
    (entry) => ({
      params: {
        room: entry.room.name,
        id: [`${entry.id}`, entry.slug],
      },
    })
  );

  return {
    paths,
    fallback: 'blocking',
  };
};
