import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Chat from '../../../../components/Chat/Chat';
import EntriesWrapper from '../../../../components/EntriesWrapper/EntriesWrapper';
import Layout from '../../../../components/Layout/Layout';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
} from '../../../../generated/graphql';
import useRoomData from '../../../../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../../../../lib/apolloClient';
import Custom404 from '../../../404';

export default function Entry() {
  const router = useRouter();
  const { roomData } = useRoomData();

  console.log(router.query);

  return roomData ? (
    <Layout
      title={roomData.room.name}
      ogDescription={roomData.room.description}
    >
      <EntriesWrapper>asd</EntriesWrapper>
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

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (e) {
    return {
      props: {},
    };
  }
};
