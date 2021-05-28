import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Chat from '../../components/Chat/Chat';
import Layout from '../../components/Layout/Layout';
import { indexRoomVars } from '../../consts';
import {
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  useRoomQuery,
} from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import { globalErrorVar } from '../../lib/apolloVars';

export default function Room() {
  const router = useRouter();
  const { data } = useRoomQuery({
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
    variables: {
      name: router.query.room
        ? (router.query.room as string)
        : indexRoomVars.name,
    },
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
