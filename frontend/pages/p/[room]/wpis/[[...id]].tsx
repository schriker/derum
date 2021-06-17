import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Chat from '../../../../components/Chat/Chat';
import EntriesWrapper from '../../../../components/EntriesWrapper/EntriesWrapper';
import SingleEntry from '../../../../components/Entry/Entry';
import Layout from '../../../../components/Layout/Layout';
import {
  EntryDocument,
  EntryQuery,
  EntryQueryVariables,
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

export default function Entry(): JSX.Element {
  const router = useRouter();
  const { roomData } = useRoomData();
  const { data } = useEntryQuery({
    variables: {
      entryId: parseInt(router.query.id[0]),
    },
  });

  return roomData ? (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [entryId] = context.params.id as string[];
    const apolloClient = initializeApollo(null, context.req.headers);
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
    });
  } catch (e) {
    return {
      props: {},
    };
  }
};
