import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition, Reference } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { indexRoomVars } from '../consts';
import { createUploadLink } from 'apollo-upload-client';
import { GetServerSidePropsResult } from 'next';

let authLink: ApolloLink;

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
  credentials: 'include',
});

export const wsLink = process.browser
  ? new WebSocketLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_WS,
      options: {
        reconnect: true,
        lazy: true,
      },
    })
  : null;
const splitLink = process.browser
  ? split(
      ({ query, operationName }) => {
        const definition = getMainDefinition(query);
        if (operationName === 'CreateMessage') return true;
        if (operationName === 'DeleteMessage') return true;
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(splitLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            initialMessages: {
              merge(_, incoming) {
                return incoming;
              },
            },
            entries: {
              keyArgs: false,
              merge(existing, incoming, { args, readField }) {
                if (args.queryData.offset === 0) return incoming;
                const filtered = incoming.filter(
                  (item) =>
                    !existing.some(
                      (current) =>
                        readField('id', current) === readField('id', item)
                    )
                );
                return [...existing, ...filtered];
              },
              read(existing, { args, readField }) {
                if (args.queryData.roomName === indexRoomVars.name)
                  return existing;
                const filteredByRoom =
                  existing &&
                  existing.filter((item) => {
                    const room: Reference = readField('room', item);
                    const roomName: Reference = readField('name', room);
                    return roomName === args.queryData.roomName;
                  });
                return filteredByRoom;
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState = null,
  headers = {}
): ApolloClient<NormalizedCacheObject> {
  authLink = setContext((_, { headers: apolloHeaders }) => {
    return {
      headers: {
        ...apolloHeaders,
        ...headers,
      },
    };
  });
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: { [key: string]: unknown } }
): GetServerSidePropsResult<{ [key: string]: unknown }> {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: {
  [key: string]: unknown;
}): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
