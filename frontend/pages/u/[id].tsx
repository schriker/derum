import React from 'react';
import Custom404 from '../404';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout/Layout';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import EntriesWrapper from '../../components/EntriesWrapper/EntriesWrapper';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  UserDocument,
  UserQuery,
  UserQueryVariables,
  useUserQuery,
} from '../../generated/graphql';
import { indexRoomVars } from '../../consts';
import { useRouter } from 'next/router';

export default function User() {
  const router = useRouter();
  const { data } = useUserQuery({
    variables: {
      id: parseInt(router.query.id as string),
    },
  });

  return data ? (
    <Layout title="as" ogDescription="asd">
      <EntriesWrapper>{data.user.displayName}</EntriesWrapper>
    </Layout>
  ) : (
    <Custom404 />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apolloClient = initializeApollo(null, context.req.headers);
    await apolloClient.query<UserQuery, UserQueryVariables>({
      query: UserDocument,
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
