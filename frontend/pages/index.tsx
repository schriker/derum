import { indexRoomVars } from '../consts';
import {
  RoomQuery,
  RoomQueryVariables,
  RoomDocument,
} from '../generated/graphql';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Room from './p/[room]';

export default Room;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

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
