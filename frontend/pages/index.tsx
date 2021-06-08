import { indexRoomVars } from '../consts';
import {
  RoomQuery,
  RoomQueryVariables,
  RoomDocument,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from '../generated/graphql';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Room from './p/[room]/[[...sort]]';

export default Room;

export async function getServerSideProps(context) {
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

  return addApolloState(apolloClient, {
    props: {},
  });
}
