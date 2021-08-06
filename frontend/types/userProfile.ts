import {
  UserCommentsQuery,
  UserEntriesQuery,
  UserMessagesQuery,
  UserProfileQuery,
  useUserCommentsQuery,
  useUserEntriesQuery,
  useUserMessagesQuery,
} from '../generated/graphql';

export type UserContentButtonsProps = {
  setIndex: (index: number) => void;
  data: UserProfileQuery;
  tabIndex: number;
};

export type UserProfileContentCreatedRoomsProps = {
  data: UserProfileQuery;
};

export type UserProfileContentProps = {
  tabIndex: number;
};

export type QueryType =
  | typeof useUserEntriesQuery
  | typeof useUserMessagesQuery
  | typeof useUserCommentsQuery;

export type ReturnDataType<T extends QueryType> =
  T extends typeof useUserEntriesQuery
    ? UserEntriesQuery
    : T extends typeof useUserMessagesQuery
    ? UserMessagesQuery
    : UserCommentsQuery;

export type ReturnType<T extends QueryType> = {
  hasMore: boolean;
  ref: (node?: Element) => void;
  data: ReturnDataType<T>;
};
