import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import Chat from '../components/Chat/Chat';
import Layout from '../components/Layout/Layout';
import { indexRoomVars } from '../consts';
import {
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  useRoomQuery,
} from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';

export default function Home() {
  const [error, setError] = useState(false);

  const { data } = useRoomQuery({
    onError: () => setError(true),
    variables: indexRoomVars,
  });

  return (
    <Layout
      title={`${data.room.name} - ${data.room.description}`}
      ogDescription="Description"
    >
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          variant="filled"
        >
          Błąd serwera!
        </Alert>
      </Snackbar>
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
