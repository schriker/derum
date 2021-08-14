import { Box } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import EntriesWrapper from '../../components/EntriesWrapper/EntriesWrapper';
import Layout from '../../components/Layout/Layout';
import UserContentButtons from '../../components/UserContentButtons/UserContentButtons';
import UserHeader from '../../components/UserHeader/UserHeader';
import UserProfileContent from '../../components/UserProfileContent/UserProfileContent';
import UserProfileContentCreatedRooms from '../../components/UserProfileCreatedRooms/UserProfileContentCreatedRooms';
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
  const [tabIndex, setTabIndex] = useState(0);

  return data ? (
    <Layout title={data.user.displayName} ogDescription="">
      <EntriesWrapper>
        <UserHeader />
        <UserContentButtons
          setIndex={setTabIndex}
          tabIndex={tabIndex}
          data={data}
        />
        <Box display="flex" mt={2} pb={2} alignItems="flex-start">
          <UserProfileContent tabIndex={tabIndex} />
          <UserProfileContentCreatedRooms data={data} />
        </Box>
      </EntriesWrapper>
    </Layout>
  ) : (
    <Custom404 />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apolloClient = initializeApollo(null);
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
