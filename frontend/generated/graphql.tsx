import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  createdAt: Scalars['Timestamp'];
  author: User;
  body: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: Room;
  createMessage: Message;
  deleteMessage: Scalars['Boolean'];
  loginUserWithFacebook: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  changeUserDisplayName: User;
};


export type MutationCreateRoomArgs = {
  newRoomData: NewRoomInput;
};


export type MutationCreateMessageArgs = {
  newMessageData: NewMessageInput;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Float'];
};


export type MutationLoginUserWithFacebookArgs = {
  access_token: Scalars['String'];
};


export type MutationChangeUserDisplayNameArgs = {
  name: Scalars['String'];
};

export type NewMessageInput = {
  roomId: Scalars['Int'];
  body: Scalars['String'];
};

export type NewRoomInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  room: Room;
  initialMessages: Array<Message>;
  me: User;
};


export type QueryRoomArgs = {
  name: Scalars['String'];
};


export type QueryInitialMessagesArgs = {
  roomId: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['Int'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
  name: Scalars['String'];
  description: Scalars['String'];
  author: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
  messageDeleted: Message;
};


export type SubscriptionMessageAddedArgs = {
  roomId: Scalars['Int'];
};


export type SubscriptionMessageDeletedArgs = {
  roomId: Scalars['Int'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  photo: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  isModerator: Scalars['Boolean'];
};

export type AuthorFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'photo' | 'isAdmin' | 'isModerator'>
);

export type LoginUserWithFacebookMutationVariables = Exact<{
  access_token: Scalars['String'];
}>;


export type LoginUserWithFacebookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUserWithFacebook'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type InitialMessagesQueryVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type InitialMessagesQuery = (
  { __typename?: 'Query' }
  & { initialMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'body' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & AuthorFragmentFragment
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'email' | 'photo' | 'isAdmin' | 'isModerator'>
  ) }
);

export type RoomQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type RoomQuery = (
  { __typename?: 'Query' }
  & { room: (
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name' | 'description'>
    & { author: (
      { __typename?: 'User' }
      & AuthorFragmentFragment
    ) }
  ) }
);

export type MessageAddedSubscriptionVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type MessageAddedSubscription = (
  { __typename?: 'Subscription' }
  & { messageAdded: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'body' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & AuthorFragmentFragment
    ) }
  ) }
);

export type MessageDeletedSubscriptionVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type MessageDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { messageDeleted: (
    { __typename?: 'Message' }
    & Pick<Message, 'id'>
    & { author: (
      { __typename?: 'User' }
      & AuthorFragmentFragment
    ) }
  ) }
);

export const AuthorFragmentFragmentDoc = gql`
    fragment AuthorFragment on User {
  id
  displayName
  photo
  isAdmin
  isModerator
}
    `;
export const LoginUserWithFacebookDocument = gql`
    mutation LoginUserWithFacebook($access_token: String!) {
  loginUserWithFacebook(access_token: $access_token)
}
    `;
export type LoginUserWithFacebookMutationFn = Apollo.MutationFunction<LoginUserWithFacebookMutation, LoginUserWithFacebookMutationVariables>;

/**
 * __useLoginUserWithFacebookMutation__
 *
 * To run a mutation, you first call `useLoginUserWithFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserWithFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserWithFacebookMutation, { data, loading, error }] = useLoginUserWithFacebookMutation({
 *   variables: {
 *      access_token: // value for 'access_token'
 *   },
 * });
 */
export function useLoginUserWithFacebookMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserWithFacebookMutation, LoginUserWithFacebookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserWithFacebookMutation, LoginUserWithFacebookMutationVariables>(LoginUserWithFacebookDocument, options);
      }
export type LoginUserWithFacebookMutationHookResult = ReturnType<typeof useLoginUserWithFacebookMutation>;
export type LoginUserWithFacebookMutationResult = Apollo.MutationResult<LoginUserWithFacebookMutation>;
export type LoginUserWithFacebookMutationOptions = Apollo.BaseMutationOptions<LoginUserWithFacebookMutation, LoginUserWithFacebookMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const InitialMessagesDocument = gql`
    query InitialMessages($roomId: Int!) {
  initialMessages(roomId: $roomId) {
    id
    body
    createdAt
    author {
      ...AuthorFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}`;

/**
 * __useInitialMessagesQuery__
 *
 * To run a query within a React component, call `useInitialMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitialMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitialMessagesQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useInitialMessagesQuery(baseOptions: Apollo.QueryHookOptions<InitialMessagesQuery, InitialMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitialMessagesQuery, InitialMessagesQueryVariables>(InitialMessagesDocument, options);
      }
export function useInitialMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitialMessagesQuery, InitialMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitialMessagesQuery, InitialMessagesQueryVariables>(InitialMessagesDocument, options);
        }
export type InitialMessagesQueryHookResult = ReturnType<typeof useInitialMessagesQuery>;
export type InitialMessagesLazyQueryHookResult = ReturnType<typeof useInitialMessagesLazyQuery>;
export type InitialMessagesQueryResult = Apollo.QueryResult<InitialMessagesQuery, InitialMessagesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    displayName
    email
    photo
    isAdmin
    isModerator
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RoomDocument = gql`
    query Room($name: String!) {
  room(name: $name) {
    id
    name
    description
    author {
      ...AuthorFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}`;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRoomQuery(baseOptions: Apollo.QueryHookOptions<RoomQuery, RoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomQuery, RoomQueryVariables>(RoomDocument, options);
      }
export function useRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomQuery, RoomQueryVariables>(RoomDocument, options);
        }
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomQueryResult = Apollo.QueryResult<RoomQuery, RoomQueryVariables>;
export const MessageAddedDocument = gql`
    subscription MessageAdded($roomId: Int!) {
  messageAdded(roomId: $roomId) {
    id
    body
    createdAt
    author {
      ...AuthorFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}`;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageAddedSubscription, MessageAddedSubscriptionVariables>(MessageAddedDocument, options);
      }
export type MessageAddedSubscriptionHookResult = ReturnType<typeof useMessageAddedSubscription>;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<MessageAddedSubscription>;
export const MessageDeletedDocument = gql`
    subscription MessageDeleted($roomId: Int!) {
  messageDeleted(roomId: $roomId) {
    id
    author {
      ...AuthorFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}`;

/**
 * __useMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageDeletedSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessageDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>(MessageDeletedDocument, options);
      }
export type MessageDeletedSubscriptionHookResult = ReturnType<typeof useMessageDeletedSubscription>;
export type MessageDeletedSubscriptionResult = Apollo.SubscriptionResult<MessageDeletedSubscription>;