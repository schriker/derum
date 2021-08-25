import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { indexRoomVars } from '../../consts';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
  useVerifyUserEmailMutation,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import { globalErrorVar } from '../../lib/apolloVars';

export default function VerifyEmail() {
  useRoomData();
  const router = useRouter();
  const [verify] = useVerifyUserEmailMutation({
    onCompleted: ({ verifyUserEmail }) => {
      if (verifyUserEmail) {
        router.push('/');
        globalErrorVar({
          isOpen: true,
          type: 'success',
          message: 'Konto zostało zweryfikowane. Możesz się zalogować.',
        });
      }
    },
    onError: (e) => {
      router.push('/');
      globalErrorVar({
        isOpen: true,
        message: e.message,
      });
    },
  });

  useEffect(() => {
    const token = router.query.token as string;
    verify({
      variables: {
        token: token,
      },
    });
  }, [router, verify]);

  return (
    <Layout title="Weryfikacja konta" ogDescription="Strona weryfikacji konta.">
      <LoadingSpinner />
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
