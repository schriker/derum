import { GetServerSideProps } from 'next';
import React from 'react';
import EntriesWrapper from '../../components/EntriesWrapper/EntriesWrapper';
import Layout from '../../components/Layout/Layout';
import UserHeader from '../../components/UserHeader/UserHeader';
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
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import useUserProfileData from '../../hooks/useUserData';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import Custom404 from '../404';

export default function User() {
  useRoomData();
  const { data } = useUserProfileData();

  return data ? (
    <Layout title={data.user.displayName} ogDescription="">
      <EntriesWrapper>
        <UserHeader />
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
