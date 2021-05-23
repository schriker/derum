import { Box } from '@material-ui/core';
import React from 'react';
import Chat from '../components/Chat/Chat';
import Layout from '../components/Layout/Layout';
import { indexRoomVars } from '../consts';
import {
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  useMeQuery,
  useRoomQuery,
} from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { globalErrorVar } from '../lib/apolloVars';

export default function Home() {
  const { data } = useRoomQuery({
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
    variables: indexRoomVars,
  });

  return (
    <Layout
      title={`${data.room.name} - ${data.room.description}`}
      ogDescription="Description"
    >
      <Box flex="1 1 auto">Content</Box>
      <Chat roomId={data.room.id} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query<RoomQuery, RoomQueryVariables>({
    query: RoomDocument,
    variables: indexRoomVars,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
