import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import NewPasswordForm from '../../components/NewPasswordForm/NewPasswordForm';
import { indexRoomVars } from '../../consts';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function ResetPassword() {
  useRoomData();

  return (
    <Layout title="Resetowanie hasła" ogDescription="Strona resetowanie hasła.">
      <NewPasswordForm />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apolloClient = initializeApollo(null);
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
