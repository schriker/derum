import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import EntriesWrapper from '../../components/EntriesWrapper/EntriesWrapper';
import Layout from '../../components/Layout/Layout';
import { indexRoomVars } from '../../consts';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  UserProfileDocument,
  UserProfileQuery,
  UserProfileQueryVariables,
  useUserProfileQuery,
} from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import Custom404 from '../404';

export default function User() {
  const router = useRouter();
  const { data } = useUserProfileQuery({
    variables: {
      id: parseInt(router.query.id as string),
    },
  });
  return data ? (
    <Layout title="as" ogDescription="asd">
      <EntriesWrapper>
        {data.user.displayName}
        {data.user.messagesNumber}
      </EntriesWrapper>
    </Layout>
  ) : (
    <Custom404 />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apolloClient = initializeApollo(null, context.req.headers);
    await apolloClient.query<UserProfileQuery, UserProfileQueryVariables>({
      query: UserProfileDocument,
      variables: {
        id: parseInt(context.params.id as string),
      },
    });

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
  } catch (e) {
    return {
      props: {},
    };
  }
};
