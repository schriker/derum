import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Chat from '../../components/Chat/Chat';
import Layout from '../../components/Layout/Layout';
import RoomAddContentButtons from '../../components/RoomAddContentButtons/RoomAddContentButtons';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import {
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function Room() {
  const router = useRouter();
  const { roomData } = useRoomData();

  return (
    <Layout
      title={roomData.room.name}
      ogDescription={roomData.room.description}
    >
      <Box px={2} pt={2} flex="1 1 auto">
        {router.query.room && <RoomHeader />}
        <RoomAddContentButtons />
        content
      </Box>
      <Chat roomId={roomData.room.id} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();

  await apolloClient.query<RoomQuery, RoomQueryVariables>({
    query: RoomDocument,
    variables: {
      name: context.params.room,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
