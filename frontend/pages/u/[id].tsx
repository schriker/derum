import { Box, Hidden, makeStyles, Theme } from '@material-ui/core';
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

const styles = makeStyles((theme: Theme) => ({
  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}));

export default function User() {
  useRoomData();
  const { data } = useUserProfileData();
  const [tabIndex, setTabIndex] = useState(0);
  const classes = styles();

  return data ? (
    <Layout
      title={data.user.displayName}
      ogDescription={data.user.displayName}
      ogImage={data.user.photo?.url}
    >
      <EntriesWrapper>
        <UserHeader />
        <UserContentButtons
          setIndex={setTabIndex}
          tabIndex={tabIndex}
          data={data}
        />
        <Box className={classes.contentWrapper}>
          <UserProfileContent tabIndex={tabIndex} />
          <Hidden smDown>
            <UserProfileContentCreatedRooms data={data} />
          </Hidden>
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
