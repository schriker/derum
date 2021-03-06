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
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  author: User;
  entry: Entry;
  body?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  voteScore?: Maybe<Scalars['Int']>;
  userVote?: Maybe<VoteValueEnum>;
  deleted: Scalars['Boolean'];
};


export type Emoji = {
  __typename?: 'Emoji';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  name: Scalars['String'];
  file: Scalars['String'];
  roomId?: Maybe<Scalars['Int']>;
};

export type Entry = {
  __typename?: 'Entry';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  url?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  publisher?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  room: Room;
  photo?: Maybe<Photo>;
  type: EntryType;
  comments: Comment;
  commentsNumber?: Maybe<Scalars['Int']>;
  voteScore?: Maybe<Scalars['Int']>;
  userVote?: Maybe<VoteValueEnum>;
  deleted: Scalars['Boolean'];
};

export enum EntrySort {
  NEW = 'NEW',
  HOT = 'HOT',
  BEST = 'BEST'
}

export enum EntryType {
  LINK = 'LINK',
  ARTICLE = 'ARTICLE',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export type Link = {
  __typename?: 'Link';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
  publisher: Scalars['String'];
  author?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  author: User;
  room: Room;
  body: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewUser: Scalars['Boolean'];
  verifyUserEmail: Scalars['Boolean'];
  createResetPasswordToken: Scalars['Boolean'];
  resetUserPassword: Scalars['Boolean'];
  changeUserPassword: Scalars['Boolean'];
  loginUserWithFacebook: Scalars['Boolean'];
  loginUserWithGoogle: Scalars['Boolean'];
  loginUserWithEmail: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  changeUserDisplayName: User;
  ignoreUser: Scalars['Boolean'];
  removeIgnoreUser: Scalars['Boolean'];
  changeUserColor: User;
  updateUserSettings: User;
  banUser: Scalars['Boolean'];
  deleteUserContent: Scalars['Boolean'];
  createRoom: Room;
  joinRoom: Scalars['Boolean'];
  leaveRoom: Scalars['Boolean'];
  createMessage: Message;
  deleteMessage: Scalars['Boolean'];
  createLink: Entry;
  createArticle: Entry;
  deleteEntry: Scalars['Boolean'];
  uploadRoomPhoto: Photo;
  uploadUserPhoto: Photo;
  deletePhoto: Scalars['Boolean'];
  vote: VoteResult;
  voteComment: VoteResult;
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  readAllNotification: Scalars['Boolean'];
  readNotification: Notification;
  blacklistPublisher: Scalars['Boolean'];
  blacklistPublisherAndRemoveEntires: Scalars['Boolean'];
  createEmoji: Scalars['Boolean'];
};


export type MutationCreateNewUserArgs = {
  newUserData: NewUserData;
};


export type MutationVerifyUserEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreateResetPasswordTokenArgs = {
  email: Scalars['String'];
};


export type MutationResetUserPasswordArgs = {
  resetPasswordData: ResetPasswordData;
};


export type MutationChangeUserPasswordArgs = {
  changePasswordData: NewPasswordData;
};


export type MutationLoginUserWithFacebookArgs = {
  access_token: Scalars['String'];
};


export type MutationLoginUserWithGoogleArgs = {
  access_token: Scalars['String'];
};


export type MutationLoginUserWithEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangeUserDisplayNameArgs = {
  name: Scalars['String'];
};


export type MutationIgnoreUserArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveIgnoreUserArgs = {
  id: Scalars['Int'];
};


export type MutationChangeUserColorArgs = {
  color: Scalars['String'];
};


export type MutationUpdateUserSettingsArgs = {
  newSettingsData: NewSettingsData;
};


export type MutationBanUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserContentArgs = {
  id: Scalars['Int'];
};


export type MutationCreateRoomArgs = {
  newRoomData: NewRoomInput;
};


export type MutationJoinRoomArgs = {
  id: Scalars['Int'];
};


export type MutationLeaveRoomArgs = {
  id: Scalars['Int'];
};


export type MutationCreateMessageArgs = {
  newMessageData: NewMessageInput;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};


export type MutationCreateLinkArgs = {
  newLinkData: NewLinkData;
};


export type MutationCreateArticleArgs = {
  photo?: Maybe<Scalars['Upload']>;
  newArticleData: NewArticleData;
};


export type MutationDeleteEntryArgs = {
  id: Scalars['Int'];
};


export type MutationUploadRoomPhotoArgs = {
  attachment: Scalars['Upload'];
  roomId: Scalars['Int'];
};


export type MutationUploadUserPhotoArgs = {
  attachment: Scalars['Upload'];
};


export type MutationDeletePhotoArgs = {
  photoId: Scalars['Int'];
};


export type MutationVoteArgs = {
  value: VoteValueEnum;
  entryId: Scalars['Int'];
};


export type MutationVoteCommentArgs = {
  value: VoteValueEnum;
  commentId: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  commentData: NewCommentData;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
};


export type MutationReadNotificationArgs = {
  id: Scalars['Int'];
};


export type MutationBlacklistPublisherArgs = {
  entryId: Scalars['Int'];
};


export type MutationBlacklistPublisherAndRemoveEntiresArgs = {
  entryId: Scalars['Int'];
};


export type MutationCreateEmojiArgs = {
  newEmojiData: NewEmojiData;
};

export type NewArticleData = {
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  roomId: Scalars['Int'];
};

export type NewCommentData = {
  body: Scalars['String'];
  entryId: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
};

export type NewEmojiData = {
  name: Scalars['String'];
  url: Scalars['String'];
  roomId?: Maybe<Scalars['Int']>;
};

export type NewLinkData = {
  title: Scalars['String'];
  description: Scalars['String'];
  linkId: Scalars['Int'];
  roomId: Scalars['Int'];
};

export type NewMessageInput = {
  roomId: Scalars['Int'];
  body: Scalars['String'];
};

export type NewPasswordData = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
  newPasswordConfirmation: Scalars['String'];
};

export type NewRoomInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type NewSettingsData = {
  showNotifications?: Maybe<Scalars['Boolean']>;
  showAvatars?: Maybe<Scalars['Boolean']>;
  showColorNames?: Maybe<Scalars['Boolean']>;
};

export type NewUserData = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  user: User;
  triggeredBy: User;
  url: Scalars['String'];
  objectId: Scalars['Int'];
  parentId: Scalars['Int'];
  objectType: ObjectTypeEnum;
  readed: Scalars['Boolean'];
};

export enum ObjectTypeEnum {
  REPLY = 'REPLY',
  COMMENT = 'COMMENT'
}

export type OnlineUser = {
  __typename?: 'OnlineUser';
  userId: Scalars['Int'];
  roomId: Scalars['Int'];
  name: Scalars['String'];
  photo?: Maybe<Photo>;
  isAdmin: Scalars['Boolean'];
  isModerator: Scalars['Boolean'];
  isBanned: Scalars['Boolean'];
  color: Scalars['String'];
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  user: User;
  userEntries: Array<Entry>;
  userComments: Array<Comment>;
  userMessages: Array<Message>;
  onlineUsers: Array<OnlineUser>;
  room: Room;
  rooms: Array<Room>;
  newRooms: Array<Room>;
  searchRooms: Array<Room>;
  popularRooms: Array<Room>;
  initialMessages: Array<Message>;
  entry: Entry;
  entries: Array<Entry>;
  checkLinkExsits: Array<Entry>;
  metadata: Link;
  comments: Array<Comment>;
  comment: Comment;
  newNotificationsNumber: Scalars['Int'];
  notifications: Array<Notification>;
  globalEmojis: Array<Emoji>;
  search: SearchResult;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserEntriesArgs = {
  userId: Scalars['Int'];
  offsetId: Scalars['Int'];
};


export type QueryUserCommentsArgs = {
  userId: Scalars['Int'];
  offsetId: Scalars['Int'];
};


export type QueryUserMessagesArgs = {
  userId: Scalars['Int'];
  offsetId: Scalars['Int'];
};


export type QueryOnlineUsersArgs = {
  roomId: Scalars['Int'];
};


export type QueryRoomArgs = {
  name: Scalars['String'];
};


export type QuerySearchRoomsArgs = {
  name: Scalars['String'];
};


export type QueryPopularRoomsArgs = {
  limit: Scalars['Int'];
};


export type QueryInitialMessagesArgs = {
  roomId: Scalars['Int'];
};


export type QueryEntryArgs = {
  entryId: Scalars['Int'];
};


export type QueryEntriesArgs = {
  queryData: QueryEntriesInput;
};


export type QueryCheckLinkExsitsArgs = {
  linkId: Scalars['Int'];
  roomId: Scalars['Int'];
};


export type QueryMetadataArgs = {
  url: Scalars['String'];
};


export type QueryCommentsArgs = {
  entryId: Scalars['Int'];
};


export type QueryCommentArgs = {
  commentId: Scalars['Int'];
};


export type QueryNotificationsArgs = {
  offsetId: Scalars['Int'];
};


export type QuerySearchArgs = {
  query: Scalars['String'];
};

export type QueryEntriesInput = {
  roomName: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sort: EntrySort;
};

export type ResetPasswordData = {
  token: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  name: Scalars['String'];
  description: Scalars['String'];
  author?: Maybe<User>;
  usersNumber?: Maybe<Scalars['Int']>;
  photo?: Maybe<Photo>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  users: Array<User>;
  comments: Array<Comment>;
  entires: Array<Entry>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
  messageDeleted: Message;
  notification: Notification;
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
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
  photo?: Maybe<Photo>;
  messagesNumber: Scalars['Int'];
  createdRooms?: Maybe<Array<Room>>;
  entriesNumber: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  isModerator: Scalars['Boolean'];
  isBanned: Scalars['Boolean'];
  showNotifications: Scalars['Boolean'];
  showAvatars: Scalars['Boolean'];
  showColorNames: Scalars['Boolean'];
  color: Scalars['String'];
  joinedRooms: Array<Room>;
  ignore: Array<User>;
  notifications: Array<Notification>;
  points: Scalars['Int'];
  commentsNumber: Scalars['Int'];
};

export type VoteResult = {
  __typename?: 'VoteResult';
  userValue: Scalars['Int'];
  voteScore: Scalars['Int'];
};

export enum VoteValueEnum {
  UP = 'UP',
  DOWN = 'DOWN',
  NONE = 'NONE'
}

export type AuthorFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'isAdmin' | 'createdAt' | 'isModerator' | 'displayName' | 'isBanned' | 'color'>
);

export type CommentFragmentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'createdAt' | 'body' | 'parentId' | 'voteScore' | 'userVote'>
  & { author: (
    { __typename?: 'User' }
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & PhotoFragmentFragment
    )> }
    & AuthorFragmentFragment
  ) }
);

export type EntryFragmentFragment = (
  { __typename?: 'Entry' }
  & Pick<Entry, 'id' | 'createdAt' | 'url' | 'slug' | 'title' | 'publisher' | 'description' | 'voteScore' | 'userVote' | 'deleted' | 'commentsNumber' | 'type'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & AuthorFragmentFragment
  )>, photo?: Maybe<(
    { __typename?: 'Photo' }
    & PhotoFragmentFragment
  )>, room: (
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name'>
  ) }
);

export type NotificationFragmentFragment = (
  { __typename?: 'Notification' }
  & Pick<Notification, 'id' | 'url' | 'createdAt' | 'objectType' | 'objectId' | 'parentId' | 'readed'>
  & { triggeredBy: (
    { __typename?: 'User' }
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & PhotoFragmentFragment
    )> }
    & AuthorFragmentFragment
  ) }
);

export type PhotoFragmentFragment = (
  { __typename?: 'Photo' }
  & Pick<Photo, 'id' | 'name' | 'url'>
);

export type RoomFragmentFragment = (
  { __typename?: 'Room' }
  & Pick<Room, 'id' | 'name' | 'description' | 'usersNumber'>
  & { photo?: Maybe<(
    { __typename?: 'Photo' }
    & PhotoFragmentFragment
  )>, author?: Maybe<(
    { __typename?: 'User' }
    & AuthorFragmentFragment
  )> }
);

export type BanUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BanUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'banUser'>
);

export type BlacklistPublisherMutationVariables = Exact<{
  entryId: Scalars['Int'];
}>;


export type BlacklistPublisherMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'blacklistPublisher'>
);

export type BlacklistPublisherAndRemoveEntiresMutationVariables = Exact<{
  entryId: Scalars['Int'];
}>;


export type BlacklistPublisherAndRemoveEntiresMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'blacklistPublisherAndRemoveEntires'>
);

export type ChangeUserColorMutationVariables = Exact<{
  color: Scalars['String'];
}>;


export type ChangeUserColorMutation = (
  { __typename?: 'Mutation' }
  & { changeUserColor: (
    { __typename?: 'User' }
    & AuthorFragmentFragment
  ) }
);

export type ChangeUserDisplayNameMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type ChangeUserDisplayNameMutation = (
  { __typename?: 'Mutation' }
  & { changeUserDisplayName: (
    { __typename?: 'User' }
    & AuthorFragmentFragment
  ) }
);

export type ChangeUserPasswordMutationVariables = Exact<{
  changePasswordData: NewPasswordData;
}>;


export type ChangeUserPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeUserPassword'>
);

export type CreateArticleMutationVariables = Exact<{
  newArticleData: NewArticleData;
  photo?: Maybe<Scalars['Upload']>;
}>;


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & { createArticle: (
    { __typename?: 'Entry' }
    & EntryFragmentFragment
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  commentData: NewCommentData;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & CommentFragmentFragment
  ) }
);

export type CreateLinkMutationVariables = Exact<{
  newLinkData: NewLinkData;
}>;


export type CreateLinkMutation = (
  { __typename?: 'Mutation' }
  & { createLink: (
    { __typename?: 'Entry' }
    & EntryFragmentFragment
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  roomId: Scalars['Int'];
  body: Scalars['String'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id'>
  ) }
);

export type CreateNewUserMutationVariables = Exact<{
  newUserData: NewUserData;
}>;


export type CreateNewUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createNewUser'>
);

export type CreateResetPasswordTokenMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateResetPasswordTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createResetPasswordToken'>
);

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'Room' }
    & RoomFragmentFragment
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteEntryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEntryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEntry'>
);

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type DeletePhotoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePhotoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePhoto'>
);

export type DeleteUserContentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserContentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUserContent'>
);

export type IgnoreUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IgnoreUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'ignoreUser'>
);

export type JoinRoomMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type JoinRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinRoom'>
);

export type LeaveRoomMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LeaveRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveRoom'>
);

export type LoginUserWithEmailMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserWithEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUserWithEmail'>
);

export type LoginUserWithFacebookMutationVariables = Exact<{
  access_token: Scalars['String'];
}>;


export type LoginUserWithFacebookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUserWithFacebook'>
);

export type LoginUserWithGoogleMutationVariables = Exact<{
  access_token: Scalars['String'];
}>;


export type LoginUserWithGoogleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUserWithGoogle'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ReadAllNotificationMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadAllNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'readAllNotification'>
);

export type ReadNotificationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReadNotificationMutation = (
  { __typename?: 'Mutation' }
  & { readNotification: (
    { __typename?: 'Notification' }
    & NotificationFragmentFragment
  ) }
);

export type RemoveIgnoreUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveIgnoreUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeIgnoreUser'>
);

export type ResetUserPasswordMutationVariables = Exact<{
  resetPasswordData: ResetPasswordData;
}>;


export type ResetUserPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetUserPassword'>
);

export type UpdateUserSettingsMutationVariables = Exact<{
  newSettingsData: NewSettingsData;
}>;


export type UpdateUserSettingsMutation = (
  { __typename?: 'Mutation' }
  & { updateUserSettings: (
    { __typename?: 'User' }
    & Pick<User, 'showAvatars' | 'showColorNames' | 'showNotifications'>
    & AuthorFragmentFragment
  ) }
);

export type UploadRoomPhotoMutationVariables = Exact<{
  attachment: Scalars['Upload'];
  roomId: Scalars['Int'];
}>;


export type UploadRoomPhotoMutation = (
  { __typename?: 'Mutation' }
  & { uploadRoomPhoto: (
    { __typename?: 'Photo' }
    & PhotoFragmentFragment
  ) }
);

export type UploadUserPhotoMutationVariables = Exact<{
  attachment: Scalars['Upload'];
}>;


export type UploadUserPhotoMutation = (
  { __typename?: 'Mutation' }
  & { uploadUserPhoto: (
    { __typename?: 'Photo' }
    & PhotoFragmentFragment
  ) }
);

export type VerifyUserEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyUserEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyUserEmail'>
);

export type VoteMutationVariables = Exact<{
  value: VoteValueEnum;
  entryId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'userValue' | 'voteScore'>
  ) }
);

export type VoteCommentMutationVariables = Exact<{
  value: VoteValueEnum;
  commentId: Scalars['Int'];
}>;


export type VoteCommentMutation = (
  { __typename?: 'Mutation' }
  & { voteComment: (
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'userValue' | 'voteScore'>
  ) }
);

export type CheckLinkExsitsQueryVariables = Exact<{
  linkId: Scalars['Int'];
  roomId: Scalars['Int'];
}>;


export type CheckLinkExsitsQuery = (
  { __typename?: 'Query' }
  & { checkLinkExsits: Array<(
    { __typename?: 'Entry' }
    & EntryFragmentFragment
  )> }
);

export type CommentQueryVariables = Exact<{
  commentId: Scalars['Int'];
}>;


export type CommentQuery = (
  { __typename?: 'Query' }
  & { comment: (
    { __typename?: 'Comment' }
    & CommentFragmentFragment
  ) }
);

export type CommentsQueryVariables = Exact<{
  entryId: Scalars['Int'];
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & CommentFragmentFragment
  )> }
);

export type EntriesQueryVariables = Exact<{
  queryData: QueryEntriesInput;
}>;


export type EntriesQuery = (
  { __typename?: 'Query' }
  & { entries: Array<(
    { __typename?: 'Entry' }
    & EntryFragmentFragment
  )> }
);

export type EntryQueryVariables = Exact<{
  entryId: Scalars['Int'];
}>;


export type EntryQuery = (
  { __typename?: 'Query' }
  & { entry: (
    { __typename?: 'Entry' }
    & Pick<Entry, 'body'>
    & EntryFragmentFragment
  ) }
);

export type GlobalEmojisQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalEmojisQuery = (
  { __typename?: 'Query' }
  & { globalEmojis: Array<(
    { __typename?: 'Emoji' }
    & Pick<Emoji, 'id' | 'name' | 'file'>
  )> }
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
      & { photo?: Maybe<(
        { __typename?: 'Photo' }
        & PhotoFragmentFragment
      )> }
      & AuthorFragmentFragment
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'showAvatars' | 'showColorNames' | 'showNotifications'>
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & PhotoFragmentFragment
    )>, ignore: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'displayName'>
    )>, joinedRooms: Array<(
      { __typename?: 'Room' }
      & RoomFragmentFragment
    )>, createdRooms?: Maybe<Array<(
      { __typename?: 'Room' }
      & RoomFragmentFragment
    )>> }
    & AuthorFragmentFragment
  ) }
);

export type MetadataQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type MetadataQuery = (
  { __typename?: 'Query' }
  & { metadata: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'url' | 'publisher' | 'author' | 'title' | 'description' | 'photo'>
  ) }
);

export type NewNotificationsNumberQueryVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationsNumberQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'newNotificationsNumber'>
);

export type NewRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type NewRoomsQuery = (
  { __typename?: 'Query' }
  & { newRooms: Array<(
    { __typename?: 'Room' }
    & RoomFragmentFragment
  )> }
);

export type NotificationsQueryVariables = Exact<{
  offsetId: Scalars['Int'];
}>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: Array<(
    { __typename?: 'Notification' }
    & NotificationFragmentFragment
  )> }
);

export type OnlineUsersQueryVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type OnlineUsersQuery = (
  { __typename?: 'Query' }
  & { onlineUsers: Array<(
    { __typename?: 'OnlineUser' }
    & Pick<OnlineUser, 'userId' | 'name' | 'isAdmin' | 'isModerator' | 'color'>
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & PhotoFragmentFragment
    )> }
  )> }
);

export type PopularRoomsQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type PopularRoomsQuery = (
  { __typename?: 'Query' }
  & { popularRooms: Array<(
    { __typename?: 'Room' }
    & RoomFragmentFragment
  )> }
);

export type RoomQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type RoomQuery = (
  { __typename?: 'Query' }
  & { room: (
    { __typename?: 'Room' }
    & RoomFragmentFragment
  ) }
);

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = (
  { __typename?: 'Query' }
  & { rooms: Array<(
    { __typename?: 'Room' }
    & RoomFragmentFragment
  )> }
);

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search: (
    { __typename?: 'SearchResult' }
    & { users: Array<(
      { __typename?: 'User' }
      & { photo?: Maybe<(
        { __typename?: 'Photo' }
        & PhotoFragmentFragment
      )> }
      & AuthorFragmentFragment
    )>, entires: Array<(
      { __typename?: 'Entry' }
      & EntryFragmentFragment
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & { entry: (
        { __typename?: 'Entry' }
        & EntryFragmentFragment
      ) }
      & CommentFragmentFragment
    )> }
  ) }
);

export type SearchRoomQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SearchRoomQuery = (
  { __typename?: 'Query' }
  & { searchRooms: Array<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'name' | 'usersNumber'>
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & Pick<Photo, 'id' | 'name' | 'url'>
    )> }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & PhotoFragmentFragment
    )> }
    & AuthorFragmentFragment
  ) }
);

export type UserCommentsQueryVariables = Exact<{
  userId: Scalars['Int'];
  offsetId: Scalars['Int'];
}>;


export type UserCommentsQuery = (
  { __typename?: 'Query' }
  & { userComments: Array<(
    { __typename?: 'Comment' }
    & { entry: (
      { __typename?: 'Entry' }
      & Pick<Entry, 'id' | 'slug' | 'deleted'>
      & { room: (
        { __typename?: 'Room' }
        & Pick<Room, 'id' | 'name'>
      ) }
    ) }
    & CommentFragmentFragment
  )> }
);

export type UserEntriesQueryVariables = Exact<{
  userId: Scalars['Int'];
  offsetId: Scalars['Int'];
}>;


export type UserEntriesQuery = (
  { __typename?: 'Query' }
  & { userEntries: Array<(
    { __typename?: 'Entry' }
    & EntryFragmentFragment
  )> }
);

export type UserMessagesQueryVariables = Exact<{
  userId: Scalars['Int'];
  offsetId: Scalars['Int'];
}>;


export type UserMessagesQuery = (
  { __typename?: 'Query' }
  & { userMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'body' | 'createdAt'>
    & { room: (
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'name'>
    ), author: (
      { __typename?: 'User' }
      & { photo?: Maybe<(
        { __typename?: 'Photo' }
        & PhotoFragmentFragment
      )> }
      & AuthorFragmentFragment
    ) }
  )> }
);

export type UserProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserProfileQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'points' | 'entriesNumber' | 'commentsNumber' | 'messagesNumber'>
    & { photo?: Maybe<(
      { __typename?: 'Photo' }
      & PhotoFragmentFragment
    )>, createdRooms?: Maybe<Array<(
      { __typename?: 'Room' }
      & RoomFragmentFragment
    )>> }
    & AuthorFragmentFragment
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

export type NotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationSubscription = (
  { __typename?: 'Subscription' }
  & { notification: (
    { __typename?: 'Notification' }
    & NotificationFragmentFragment
  ) }
);

export const AuthorFragmentFragmentDoc = gql`
    fragment AuthorFragment on User {
  id
  isAdmin
  createdAt
  isModerator
  displayName
  isBanned
  color
}
    `;
export const PhotoFragmentFragmentDoc = gql`
    fragment PhotoFragment on Photo {
  id
  name
  url
}
    `;
export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on Comment {
  id
  createdAt
  body
  parentId
  voteScore
  userVote
  author {
    ...AuthorFragment
    photo {
      ...PhotoFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;
export const EntryFragmentFragmentDoc = gql`
    fragment EntryFragment on Entry {
  id
  createdAt
  url
  slug
  title
  publisher
  description
  voteScore
  userVote
  deleted
  commentsNumber
  type
  deleted
  author {
    ...AuthorFragment
  }
  photo {
    ...PhotoFragment
  }
  room {
    id
    name
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;
export const NotificationFragmentFragmentDoc = gql`
    fragment NotificationFragment on Notification {
  id
  url
  createdAt
  objectType
  objectId
  parentId
  readed
  triggeredBy {
    ...AuthorFragment
    photo {
      ...PhotoFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;
export const RoomFragmentFragmentDoc = gql`
    fragment RoomFragment on Room {
  id
  name
  description
  usersNumber
  photo {
    ...PhotoFragment
  }
  author {
    ...AuthorFragment
  }
}
    ${PhotoFragmentFragmentDoc}
${AuthorFragmentFragmentDoc}`;
export const BanUserDocument = gql`
    mutation BanUser($id: Int!) {
  banUser(id: $id)
}
    `;
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>;

/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBanUserMutation(baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options);
      }
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>;
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>;
export type BanUserMutationOptions = Apollo.BaseMutationOptions<BanUserMutation, BanUserMutationVariables>;
export const BlacklistPublisherDocument = gql`
    mutation BlacklistPublisher($entryId: Int!) {
  blacklistPublisher(entryId: $entryId)
}
    `;
export type BlacklistPublisherMutationFn = Apollo.MutationFunction<BlacklistPublisherMutation, BlacklistPublisherMutationVariables>;

/**
 * __useBlacklistPublisherMutation__
 *
 * To run a mutation, you first call `useBlacklistPublisherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlacklistPublisherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blacklistPublisherMutation, { data, loading, error }] = useBlacklistPublisherMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useBlacklistPublisherMutation(baseOptions?: Apollo.MutationHookOptions<BlacklistPublisherMutation, BlacklistPublisherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlacklistPublisherMutation, BlacklistPublisherMutationVariables>(BlacklistPublisherDocument, options);
      }
export type BlacklistPublisherMutationHookResult = ReturnType<typeof useBlacklistPublisherMutation>;
export type BlacklistPublisherMutationResult = Apollo.MutationResult<BlacklistPublisherMutation>;
export type BlacklistPublisherMutationOptions = Apollo.BaseMutationOptions<BlacklistPublisherMutation, BlacklistPublisherMutationVariables>;
export const BlacklistPublisherAndRemoveEntiresDocument = gql`
    mutation BlacklistPublisherAndRemoveEntires($entryId: Int!) {
  blacklistPublisherAndRemoveEntires(entryId: $entryId)
}
    `;
export type BlacklistPublisherAndRemoveEntiresMutationFn = Apollo.MutationFunction<BlacklistPublisherAndRemoveEntiresMutation, BlacklistPublisherAndRemoveEntiresMutationVariables>;

/**
 * __useBlacklistPublisherAndRemoveEntiresMutation__
 *
 * To run a mutation, you first call `useBlacklistPublisherAndRemoveEntiresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlacklistPublisherAndRemoveEntiresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blacklistPublisherAndRemoveEntiresMutation, { data, loading, error }] = useBlacklistPublisherAndRemoveEntiresMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useBlacklistPublisherAndRemoveEntiresMutation(baseOptions?: Apollo.MutationHookOptions<BlacklistPublisherAndRemoveEntiresMutation, BlacklistPublisherAndRemoveEntiresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlacklistPublisherAndRemoveEntiresMutation, BlacklistPublisherAndRemoveEntiresMutationVariables>(BlacklistPublisherAndRemoveEntiresDocument, options);
      }
export type BlacklistPublisherAndRemoveEntiresMutationHookResult = ReturnType<typeof useBlacklistPublisherAndRemoveEntiresMutation>;
export type BlacklistPublisherAndRemoveEntiresMutationResult = Apollo.MutationResult<BlacklistPublisherAndRemoveEntiresMutation>;
export type BlacklistPublisherAndRemoveEntiresMutationOptions = Apollo.BaseMutationOptions<BlacklistPublisherAndRemoveEntiresMutation, BlacklistPublisherAndRemoveEntiresMutationVariables>;
export const ChangeUserColorDocument = gql`
    mutation ChangeUserColor($color: String!) {
  changeUserColor(color: $color) {
    ...AuthorFragment
  }
}
    ${AuthorFragmentFragmentDoc}`;
export type ChangeUserColorMutationFn = Apollo.MutationFunction<ChangeUserColorMutation, ChangeUserColorMutationVariables>;

/**
 * __useChangeUserColorMutation__
 *
 * To run a mutation, you first call `useChangeUserColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserColorMutation, { data, loading, error }] = useChangeUserColorMutation({
 *   variables: {
 *      color: // value for 'color'
 *   },
 * });
 */
export function useChangeUserColorMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserColorMutation, ChangeUserColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserColorMutation, ChangeUserColorMutationVariables>(ChangeUserColorDocument, options);
      }
export type ChangeUserColorMutationHookResult = ReturnType<typeof useChangeUserColorMutation>;
export type ChangeUserColorMutationResult = Apollo.MutationResult<ChangeUserColorMutation>;
export type ChangeUserColorMutationOptions = Apollo.BaseMutationOptions<ChangeUserColorMutation, ChangeUserColorMutationVariables>;
export const ChangeUserDisplayNameDocument = gql`
    mutation ChangeUserDisplayName($name: String!) {
  changeUserDisplayName(name: $name) {
    ...AuthorFragment
  }
}
    ${AuthorFragmentFragmentDoc}`;
export type ChangeUserDisplayNameMutationFn = Apollo.MutationFunction<ChangeUserDisplayNameMutation, ChangeUserDisplayNameMutationVariables>;

/**
 * __useChangeUserDisplayNameMutation__
 *
 * To run a mutation, you first call `useChangeUserDisplayNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserDisplayNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserDisplayNameMutation, { data, loading, error }] = useChangeUserDisplayNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useChangeUserDisplayNameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserDisplayNameMutation, ChangeUserDisplayNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserDisplayNameMutation, ChangeUserDisplayNameMutationVariables>(ChangeUserDisplayNameDocument, options);
      }
export type ChangeUserDisplayNameMutationHookResult = ReturnType<typeof useChangeUserDisplayNameMutation>;
export type ChangeUserDisplayNameMutationResult = Apollo.MutationResult<ChangeUserDisplayNameMutation>;
export type ChangeUserDisplayNameMutationOptions = Apollo.BaseMutationOptions<ChangeUserDisplayNameMutation, ChangeUserDisplayNameMutationVariables>;
export const ChangeUserPasswordDocument = gql`
    mutation ChangeUserPassword($changePasswordData: NewPasswordData!) {
  changeUserPassword(changePasswordData: $changePasswordData)
}
    `;
export type ChangeUserPasswordMutationFn = Apollo.MutationFunction<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>;

/**
 * __useChangeUserPasswordMutation__
 *
 * To run a mutation, you first call `useChangeUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserPasswordMutation, { data, loading, error }] = useChangeUserPasswordMutation({
 *   variables: {
 *      changePasswordData: // value for 'changePasswordData'
 *   },
 * });
 */
export function useChangeUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>(ChangeUserPasswordDocument, options);
      }
export type ChangeUserPasswordMutationHookResult = ReturnType<typeof useChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationResult = Apollo.MutationResult<ChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>;
export const CreateArticleDocument = gql`
    mutation CreateArticle($newArticleData: NewArticleData!, $photo: Upload) {
  createArticle(newArticleData: $newArticleData, photo: $photo) {
    ...EntryFragment
  }
}
    ${EntryFragmentFragmentDoc}`;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      newArticleData: // value for 'newArticleData'
 *      photo: // value for 'photo'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($commentData: NewCommentData!) {
  createComment(commentData: $commentData) {
    ...CommentFragment
  }
}
    ${CommentFragmentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      commentData: // value for 'commentData'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateLinkDocument = gql`
    mutation CreateLink($newLinkData: NewLinkData!) {
  createLink(newLinkData: $newLinkData) {
    ...EntryFragment
  }
}
    ${EntryFragmentFragmentDoc}`;
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      newLinkData: // value for 'newLinkData'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($roomId: Int!, $body: String!) {
  createMessage(newMessageData: {roomId: $roomId, body: $body}) {
    id
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateNewUserDocument = gql`
    mutation CreateNewUser($newUserData: NewUserData!) {
  createNewUser(newUserData: $newUserData)
}
    `;
export type CreateNewUserMutationFn = Apollo.MutationFunction<CreateNewUserMutation, CreateNewUserMutationVariables>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      newUserData: // value for 'newUserData'
 *   },
 * });
 */
export function useCreateNewUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewUserMutation, CreateNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewUserMutation, CreateNewUserMutationVariables>(CreateNewUserDocument, options);
      }
export type CreateNewUserMutationHookResult = ReturnType<typeof useCreateNewUserMutation>;
export type CreateNewUserMutationResult = Apollo.MutationResult<CreateNewUserMutation>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const CreateResetPasswordTokenDocument = gql`
    mutation CreateResetPasswordToken($email: String!) {
  createResetPasswordToken(email: $email)
}
    `;
export type CreateResetPasswordTokenMutationFn = Apollo.MutationFunction<CreateResetPasswordTokenMutation, CreateResetPasswordTokenMutationVariables>;

/**
 * __useCreateResetPasswordTokenMutation__
 *
 * To run a mutation, you first call `useCreateResetPasswordTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResetPasswordTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResetPasswordTokenMutation, { data, loading, error }] = useCreateResetPasswordTokenMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateResetPasswordTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateResetPasswordTokenMutation, CreateResetPasswordTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateResetPasswordTokenMutation, CreateResetPasswordTokenMutationVariables>(CreateResetPasswordTokenDocument, options);
      }
export type CreateResetPasswordTokenMutationHookResult = ReturnType<typeof useCreateResetPasswordTokenMutation>;
export type CreateResetPasswordTokenMutationResult = Apollo.MutationResult<CreateResetPasswordTokenMutation>;
export type CreateResetPasswordTokenMutationOptions = Apollo.BaseMutationOptions<CreateResetPasswordTokenMutation, CreateResetPasswordTokenMutationVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($name: String!, $description: String!) {
  createRoom(newRoomData: {name: $name, description: $description}) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: Int!) {
  deleteComment(commentId: $commentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteEntryDocument = gql`
    mutation DeleteEntry($id: Int!) {
  deleteEntry(id: $id)
}
    `;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, options);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: Int!) {
  deleteMessage(id: $id)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeletePhotoDocument = gql`
    mutation DeletePhoto($id: Int!) {
  deletePhoto(photoId: $id)
}
    `;
export type DeletePhotoMutationFn = Apollo.MutationFunction<DeletePhotoMutation, DeletePhotoMutationVariables>;

/**
 * __useDeletePhotoMutation__
 *
 * To run a mutation, you first call `useDeletePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhotoMutation, { data, loading, error }] = useDeletePhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePhotoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePhotoMutation, DeletePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePhotoMutation, DeletePhotoMutationVariables>(DeletePhotoDocument, options);
      }
export type DeletePhotoMutationHookResult = ReturnType<typeof useDeletePhotoMutation>;
export type DeletePhotoMutationResult = Apollo.MutationResult<DeletePhotoMutation>;
export type DeletePhotoMutationOptions = Apollo.BaseMutationOptions<DeletePhotoMutation, DeletePhotoMutationVariables>;
export const DeleteUserContentDocument = gql`
    mutation DeleteUserContent($id: Int!) {
  deleteUserContent(id: $id)
}
    `;
export type DeleteUserContentMutationFn = Apollo.MutationFunction<DeleteUserContentMutation, DeleteUserContentMutationVariables>;

/**
 * __useDeleteUserContentMutation__
 *
 * To run a mutation, you first call `useDeleteUserContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserContentMutation, { data, loading, error }] = useDeleteUserContentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserContentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserContentMutation, DeleteUserContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserContentMutation, DeleteUserContentMutationVariables>(DeleteUserContentDocument, options);
      }
export type DeleteUserContentMutationHookResult = ReturnType<typeof useDeleteUserContentMutation>;
export type DeleteUserContentMutationResult = Apollo.MutationResult<DeleteUserContentMutation>;
export type DeleteUserContentMutationOptions = Apollo.BaseMutationOptions<DeleteUserContentMutation, DeleteUserContentMutationVariables>;
export const IgnoreUserDocument = gql`
    mutation IgnoreUser($id: Int!) {
  ignoreUser(id: $id)
}
    `;
export type IgnoreUserMutationFn = Apollo.MutationFunction<IgnoreUserMutation, IgnoreUserMutationVariables>;

/**
 * __useIgnoreUserMutation__
 *
 * To run a mutation, you first call `useIgnoreUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIgnoreUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ignoreUserMutation, { data, loading, error }] = useIgnoreUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIgnoreUserMutation(baseOptions?: Apollo.MutationHookOptions<IgnoreUserMutation, IgnoreUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IgnoreUserMutation, IgnoreUserMutationVariables>(IgnoreUserDocument, options);
      }
export type IgnoreUserMutationHookResult = ReturnType<typeof useIgnoreUserMutation>;
export type IgnoreUserMutationResult = Apollo.MutationResult<IgnoreUserMutation>;
export type IgnoreUserMutationOptions = Apollo.BaseMutationOptions<IgnoreUserMutation, IgnoreUserMutationVariables>;
export const JoinRoomDocument = gql`
    mutation JoinRoom($id: Int!) {
  joinRoom(id: $id)
}
    `;
export type JoinRoomMutationFn = Apollo.MutationFunction<JoinRoomMutation, JoinRoomMutationVariables>;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoinRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinRoomMutation(baseOptions?: Apollo.MutationHookOptions<JoinRoomMutation, JoinRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument, options);
      }
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = Apollo.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = Apollo.BaseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables>;
export const LeaveRoomDocument = gql`
    mutation LeaveRoom($id: Int!) {
  leaveRoom(id: $id)
}
    `;
export type LeaveRoomMutationFn = Apollo.MutationFunction<LeaveRoomMutation, LeaveRoomMutationVariables>;

/**
 * __useLeaveRoomMutation__
 *
 * To run a mutation, you first call `useLeaveRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveRoomMutation, { data, loading, error }] = useLeaveRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveRoomMutation(baseOptions?: Apollo.MutationHookOptions<LeaveRoomMutation, LeaveRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveRoomMutation, LeaveRoomMutationVariables>(LeaveRoomDocument, options);
      }
export type LeaveRoomMutationHookResult = ReturnType<typeof useLeaveRoomMutation>;
export type LeaveRoomMutationResult = Apollo.MutationResult<LeaveRoomMutation>;
export type LeaveRoomMutationOptions = Apollo.BaseMutationOptions<LeaveRoomMutation, LeaveRoomMutationVariables>;
export const LoginUserWithEmailDocument = gql`
    mutation LoginUserWithEmail($email: String!, $password: String!) {
  loginUserWithEmail(email: $email, password: $password)
}
    `;
export type LoginUserWithEmailMutationFn = Apollo.MutationFunction<LoginUserWithEmailMutation, LoginUserWithEmailMutationVariables>;

/**
 * __useLoginUserWithEmailMutation__
 *
 * To run a mutation, you first call `useLoginUserWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserWithEmailMutation, { data, loading, error }] = useLoginUserWithEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserWithEmailMutation, LoginUserWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserWithEmailMutation, LoginUserWithEmailMutationVariables>(LoginUserWithEmailDocument, options);
      }
export type LoginUserWithEmailMutationHookResult = ReturnType<typeof useLoginUserWithEmailMutation>;
export type LoginUserWithEmailMutationResult = Apollo.MutationResult<LoginUserWithEmailMutation>;
export type LoginUserWithEmailMutationOptions = Apollo.BaseMutationOptions<LoginUserWithEmailMutation, LoginUserWithEmailMutationVariables>;
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
export const LoginUserWithGoogleDocument = gql`
    mutation LoginUserWithGoogle($access_token: String!) {
  loginUserWithGoogle(access_token: $access_token)
}
    `;
export type LoginUserWithGoogleMutationFn = Apollo.MutationFunction<LoginUserWithGoogleMutation, LoginUserWithGoogleMutationVariables>;

/**
 * __useLoginUserWithGoogleMutation__
 *
 * To run a mutation, you first call `useLoginUserWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserWithGoogleMutation, { data, loading, error }] = useLoginUserWithGoogleMutation({
 *   variables: {
 *      access_token: // value for 'access_token'
 *   },
 * });
 */
export function useLoginUserWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserWithGoogleMutation, LoginUserWithGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserWithGoogleMutation, LoginUserWithGoogleMutationVariables>(LoginUserWithGoogleDocument, options);
      }
export type LoginUserWithGoogleMutationHookResult = ReturnType<typeof useLoginUserWithGoogleMutation>;
export type LoginUserWithGoogleMutationResult = Apollo.MutationResult<LoginUserWithGoogleMutation>;
export type LoginUserWithGoogleMutationOptions = Apollo.BaseMutationOptions<LoginUserWithGoogleMutation, LoginUserWithGoogleMutationVariables>;
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
export const ReadAllNotificationDocument = gql`
    mutation ReadAllNotification {
  readAllNotification
}
    `;
export type ReadAllNotificationMutationFn = Apollo.MutationFunction<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>;

/**
 * __useReadAllNotificationMutation__
 *
 * To run a mutation, you first call `useReadAllNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadAllNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readAllNotificationMutation, { data, loading, error }] = useReadAllNotificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadAllNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>(ReadAllNotificationDocument, options);
      }
export type ReadAllNotificationMutationHookResult = ReturnType<typeof useReadAllNotificationMutation>;
export type ReadAllNotificationMutationResult = Apollo.MutationResult<ReadAllNotificationMutation>;
export type ReadAllNotificationMutationOptions = Apollo.BaseMutationOptions<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>;
export const ReadNotificationDocument = gql`
    mutation ReadNotification($id: Int!) {
  readNotification(id: $id) {
    ...NotificationFragment
  }
}
    ${NotificationFragmentFragmentDoc}`;
export type ReadNotificationMutationFn = Apollo.MutationFunction<ReadNotificationMutation, ReadNotificationMutationVariables>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReadNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationMutation, ReadNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationMutation, ReadNotificationMutationVariables>(ReadNotificationDocument, options);
      }
export type ReadNotificationMutationHookResult = ReturnType<typeof useReadNotificationMutation>;
export type ReadNotificationMutationResult = Apollo.MutationResult<ReadNotificationMutation>;
export type ReadNotificationMutationOptions = Apollo.BaseMutationOptions<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const RemoveIgnoreUserDocument = gql`
    mutation RemoveIgnoreUser($id: Int!) {
  removeIgnoreUser(id: $id)
}
    `;
export type RemoveIgnoreUserMutationFn = Apollo.MutationFunction<RemoveIgnoreUserMutation, RemoveIgnoreUserMutationVariables>;

/**
 * __useRemoveIgnoreUserMutation__
 *
 * To run a mutation, you first call `useRemoveIgnoreUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveIgnoreUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeIgnoreUserMutation, { data, loading, error }] = useRemoveIgnoreUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveIgnoreUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveIgnoreUserMutation, RemoveIgnoreUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveIgnoreUserMutation, RemoveIgnoreUserMutationVariables>(RemoveIgnoreUserDocument, options);
      }
export type RemoveIgnoreUserMutationHookResult = ReturnType<typeof useRemoveIgnoreUserMutation>;
export type RemoveIgnoreUserMutationResult = Apollo.MutationResult<RemoveIgnoreUserMutation>;
export type RemoveIgnoreUserMutationOptions = Apollo.BaseMutationOptions<RemoveIgnoreUserMutation, RemoveIgnoreUserMutationVariables>;
export const ResetUserPasswordDocument = gql`
    mutation ResetUserPassword($resetPasswordData: ResetPasswordData!) {
  resetUserPassword(resetPasswordData: $resetPasswordData)
}
    `;
export type ResetUserPasswordMutationFn = Apollo.MutationFunction<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>;

/**
 * __useResetUserPasswordMutation__
 *
 * To run a mutation, you first call `useResetUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetUserPasswordMutation, { data, loading, error }] = useResetUserPasswordMutation({
 *   variables: {
 *      resetPasswordData: // value for 'resetPasswordData'
 *   },
 * });
 */
export function useResetUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>(ResetUserPasswordDocument, options);
      }
export type ResetUserPasswordMutationHookResult = ReturnType<typeof useResetUserPasswordMutation>;
export type ResetUserPasswordMutationResult = Apollo.MutationResult<ResetUserPasswordMutation>;
export type ResetUserPasswordMutationOptions = Apollo.BaseMutationOptions<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>;
export const UpdateUserSettingsDocument = gql`
    mutation UpdateUserSettings($newSettingsData: NewSettingsData!) {
  updateUserSettings(newSettingsData: $newSettingsData) {
    ...AuthorFragment
    showAvatars
    showColorNames
    showNotifications
  }
}
    ${AuthorFragmentFragmentDoc}`;
export type UpdateUserSettingsMutationFn = Apollo.MutationFunction<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;

/**
 * __useUpdateUserSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingsMutation, { data, loading, error }] = useUpdateUserSettingsMutation({
 *   variables: {
 *      newSettingsData: // value for 'newSettingsData'
 *   },
 * });
 */
export function useUpdateUserSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>(UpdateUserSettingsDocument, options);
      }
export type UpdateUserSettingsMutationHookResult = ReturnType<typeof useUpdateUserSettingsMutation>;
export type UpdateUserSettingsMutationResult = Apollo.MutationResult<UpdateUserSettingsMutation>;
export type UpdateUserSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;
export const UploadRoomPhotoDocument = gql`
    mutation UploadRoomPhoto($attachment: Upload!, $roomId: Int!) {
  uploadRoomPhoto(attachment: $attachment, roomId: $roomId) {
    ...PhotoFragment
  }
}
    ${PhotoFragmentFragmentDoc}`;
export type UploadRoomPhotoMutationFn = Apollo.MutationFunction<UploadRoomPhotoMutation, UploadRoomPhotoMutationVariables>;

/**
 * __useUploadRoomPhotoMutation__
 *
 * To run a mutation, you first call `useUploadRoomPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadRoomPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadRoomPhotoMutation, { data, loading, error }] = useUploadRoomPhotoMutation({
 *   variables: {
 *      attachment: // value for 'attachment'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useUploadRoomPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadRoomPhotoMutation, UploadRoomPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadRoomPhotoMutation, UploadRoomPhotoMutationVariables>(UploadRoomPhotoDocument, options);
      }
export type UploadRoomPhotoMutationHookResult = ReturnType<typeof useUploadRoomPhotoMutation>;
export type UploadRoomPhotoMutationResult = Apollo.MutationResult<UploadRoomPhotoMutation>;
export type UploadRoomPhotoMutationOptions = Apollo.BaseMutationOptions<UploadRoomPhotoMutation, UploadRoomPhotoMutationVariables>;
export const UploadUserPhotoDocument = gql`
    mutation UploadUserPhoto($attachment: Upload!) {
  uploadUserPhoto(attachment: $attachment) {
    ...PhotoFragment
  }
}
    ${PhotoFragmentFragmentDoc}`;
export type UploadUserPhotoMutationFn = Apollo.MutationFunction<UploadUserPhotoMutation, UploadUserPhotoMutationVariables>;

/**
 * __useUploadUserPhotoMutation__
 *
 * To run a mutation, you first call `useUploadUserPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadUserPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadUserPhotoMutation, { data, loading, error }] = useUploadUserPhotoMutation({
 *   variables: {
 *      attachment: // value for 'attachment'
 *   },
 * });
 */
export function useUploadUserPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadUserPhotoMutation, UploadUserPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadUserPhotoMutation, UploadUserPhotoMutationVariables>(UploadUserPhotoDocument, options);
      }
export type UploadUserPhotoMutationHookResult = ReturnType<typeof useUploadUserPhotoMutation>;
export type UploadUserPhotoMutationResult = Apollo.MutationResult<UploadUserPhotoMutation>;
export type UploadUserPhotoMutationOptions = Apollo.BaseMutationOptions<UploadUserPhotoMutation, UploadUserPhotoMutationVariables>;
export const VerifyUserEmailDocument = gql`
    mutation VerifyUserEmail($token: String!) {
  verifyUserEmail(token: $token)
}
    `;
export type VerifyUserEmailMutationFn = Apollo.MutationFunction<VerifyUserEmailMutation, VerifyUserEmailMutationVariables>;

/**
 * __useVerifyUserEmailMutation__
 *
 * To run a mutation, you first call `useVerifyUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserEmailMutation, { data, loading, error }] = useVerifyUserEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyUserEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyUserEmailMutation, VerifyUserEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyUserEmailMutation, VerifyUserEmailMutationVariables>(VerifyUserEmailDocument, options);
      }
export type VerifyUserEmailMutationHookResult = ReturnType<typeof useVerifyUserEmailMutation>;
export type VerifyUserEmailMutationResult = Apollo.MutationResult<VerifyUserEmailMutation>;
export type VerifyUserEmailMutationOptions = Apollo.BaseMutationOptions<VerifyUserEmailMutation, VerifyUserEmailMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: VoteValueEnum!, $entryId: Int!) {
  vote(value: $value, entryId: $entryId) {
    userValue
    voteScore
  }
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const VoteCommentDocument = gql`
    mutation VoteComment($value: VoteValueEnum!, $commentId: Int!) {
  voteComment(value: $value, commentId: $commentId) {
    userValue
    voteScore
  }
}
    `;
export type VoteCommentMutationFn = Apollo.MutationFunction<VoteCommentMutation, VoteCommentMutationVariables>;

/**
 * __useVoteCommentMutation__
 *
 * To run a mutation, you first call `useVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCommentMutation, { data, loading, error }] = useVoteCommentMutation({
 *   variables: {
 *      value: // value for 'value'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useVoteCommentMutation(baseOptions?: Apollo.MutationHookOptions<VoteCommentMutation, VoteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(VoteCommentDocument, options);
      }
export type VoteCommentMutationHookResult = ReturnType<typeof useVoteCommentMutation>;
export type VoteCommentMutationResult = Apollo.MutationResult<VoteCommentMutation>;
export type VoteCommentMutationOptions = Apollo.BaseMutationOptions<VoteCommentMutation, VoteCommentMutationVariables>;
export const CheckLinkExsitsDocument = gql`
    query CheckLinkExsits($linkId: Int!, $roomId: Int!) {
  checkLinkExsits(linkId: $linkId, roomId: $roomId) {
    ...EntryFragment
  }
}
    ${EntryFragmentFragmentDoc}`;

/**
 * __useCheckLinkExsitsQuery__
 *
 * To run a query within a React component, call `useCheckLinkExsitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckLinkExsitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckLinkExsitsQuery({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useCheckLinkExsitsQuery(baseOptions: Apollo.QueryHookOptions<CheckLinkExsitsQuery, CheckLinkExsitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckLinkExsitsQuery, CheckLinkExsitsQueryVariables>(CheckLinkExsitsDocument, options);
      }
export function useCheckLinkExsitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckLinkExsitsQuery, CheckLinkExsitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckLinkExsitsQuery, CheckLinkExsitsQueryVariables>(CheckLinkExsitsDocument, options);
        }
export type CheckLinkExsitsQueryHookResult = ReturnType<typeof useCheckLinkExsitsQuery>;
export type CheckLinkExsitsLazyQueryHookResult = ReturnType<typeof useCheckLinkExsitsLazyQuery>;
export type CheckLinkExsitsQueryResult = Apollo.QueryResult<CheckLinkExsitsQuery, CheckLinkExsitsQueryVariables>;
export const CommentDocument = gql`
    query Comment($commentId: Int!) {
  comment(commentId: $commentId) {
    ...CommentFragment
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCommentQuery(baseOptions: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
      }
export function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
export const CommentsDocument = gql`
    query Comments($entryId: Int!) {
  comments(entryId: $entryId) {
    ...CommentFragment
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const EntriesDocument = gql`
    query Entries($queryData: QueryEntriesInput!) {
  entries(queryData: $queryData) {
    ...EntryFragment
  }
}
    ${EntryFragmentFragmentDoc}`;

/**
 * __useEntriesQuery__
 *
 * To run a query within a React component, call `useEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntriesQuery({
 *   variables: {
 *      queryData: // value for 'queryData'
 *   },
 * });
 */
export function useEntriesQuery(baseOptions: Apollo.QueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
      }
export function useEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
        }
export type EntriesQueryHookResult = ReturnType<typeof useEntriesQuery>;
export type EntriesLazyQueryHookResult = ReturnType<typeof useEntriesLazyQuery>;
export type EntriesQueryResult = Apollo.QueryResult<EntriesQuery, EntriesQueryVariables>;
export const EntryDocument = gql`
    query Entry($entryId: Int!) {
  entry(entryId: $entryId) {
    ...EntryFragment
    body
  }
}
    ${EntryFragmentFragmentDoc}`;

/**
 * __useEntryQuery__
 *
 * To run a query within a React component, call `useEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryQuery({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useEntryQuery(baseOptions: Apollo.QueryHookOptions<EntryQuery, EntryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
      }
export function useEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryQuery, EntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
        }
export type EntryQueryHookResult = ReturnType<typeof useEntryQuery>;
export type EntryLazyQueryHookResult = ReturnType<typeof useEntryLazyQuery>;
export type EntryQueryResult = Apollo.QueryResult<EntryQuery, EntryQueryVariables>;
export const GlobalEmojisDocument = gql`
    query GlobalEmojis {
  globalEmojis {
    id
    name
    file
  }
}
    `;

/**
 * __useGlobalEmojisQuery__
 *
 * To run a query within a React component, call `useGlobalEmojisQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalEmojisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalEmojisQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalEmojisQuery(baseOptions?: Apollo.QueryHookOptions<GlobalEmojisQuery, GlobalEmojisQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalEmojisQuery, GlobalEmojisQueryVariables>(GlobalEmojisDocument, options);
      }
export function useGlobalEmojisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalEmojisQuery, GlobalEmojisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalEmojisQuery, GlobalEmojisQueryVariables>(GlobalEmojisDocument, options);
        }
export type GlobalEmojisQueryHookResult = ReturnType<typeof useGlobalEmojisQuery>;
export type GlobalEmojisLazyQueryHookResult = ReturnType<typeof useGlobalEmojisLazyQuery>;
export type GlobalEmojisQueryResult = Apollo.QueryResult<GlobalEmojisQuery, GlobalEmojisQueryVariables>;
export const InitialMessagesDocument = gql`
    query InitialMessages($roomId: Int!) {
  initialMessages(roomId: $roomId) {
    id
    body
    createdAt
    author {
      ...AuthorFragment
      photo {
        ...PhotoFragment
      }
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;

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
    ...AuthorFragment
    photo {
      ...PhotoFragment
    }
    email
    showAvatars
    showColorNames
    showNotifications
    ignore {
      id
      displayName
    }
    joinedRooms {
      ...RoomFragment
    }
    createdRooms {
      ...RoomFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}
${RoomFragmentFragmentDoc}`;

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
export const MetadataDocument = gql`
    query Metadata($url: String!) {
  metadata(url: $url) {
    id
    url
    publisher
    author
    title
    description
    photo
  }
}
    `;

/**
 * __useMetadataQuery__
 *
 * To run a query within a React component, call `useMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetadataQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useMetadataQuery(baseOptions: Apollo.QueryHookOptions<MetadataQuery, MetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
      }
export function useMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetadataQuery, MetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
        }
export type MetadataQueryHookResult = ReturnType<typeof useMetadataQuery>;
export type MetadataLazyQueryHookResult = ReturnType<typeof useMetadataLazyQuery>;
export type MetadataQueryResult = Apollo.QueryResult<MetadataQuery, MetadataQueryVariables>;
export const NewNotificationsNumberDocument = gql`
    query NewNotificationsNumber {
  newNotificationsNumber
}
    `;

/**
 * __useNewNotificationsNumberQuery__
 *
 * To run a query within a React component, call `useNewNotificationsNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationsNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationsNumberQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewNotificationsNumberQuery(baseOptions?: Apollo.QueryHookOptions<NewNotificationsNumberQuery, NewNotificationsNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewNotificationsNumberQuery, NewNotificationsNumberQueryVariables>(NewNotificationsNumberDocument, options);
      }
export function useNewNotificationsNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewNotificationsNumberQuery, NewNotificationsNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewNotificationsNumberQuery, NewNotificationsNumberQueryVariables>(NewNotificationsNumberDocument, options);
        }
export type NewNotificationsNumberQueryHookResult = ReturnType<typeof useNewNotificationsNumberQuery>;
export type NewNotificationsNumberLazyQueryHookResult = ReturnType<typeof useNewNotificationsNumberLazyQuery>;
export type NewNotificationsNumberQueryResult = Apollo.QueryResult<NewNotificationsNumberQuery, NewNotificationsNumberQueryVariables>;
export const NewRoomsDocument = gql`
    query NewRooms {
  newRooms {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;

/**
 * __useNewRoomsQuery__
 *
 * To run a query within a React component, call `useNewRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewRoomsQuery(baseOptions?: Apollo.QueryHookOptions<NewRoomsQuery, NewRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewRoomsQuery, NewRoomsQueryVariables>(NewRoomsDocument, options);
      }
export function useNewRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewRoomsQuery, NewRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewRoomsQuery, NewRoomsQueryVariables>(NewRoomsDocument, options);
        }
export type NewRoomsQueryHookResult = ReturnType<typeof useNewRoomsQuery>;
export type NewRoomsLazyQueryHookResult = ReturnType<typeof useNewRoomsLazyQuery>;
export type NewRoomsQueryResult = Apollo.QueryResult<NewRoomsQuery, NewRoomsQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications($offsetId: Int!) {
  notifications(offsetId: $offsetId) {
    ...NotificationFragment
  }
}
    ${NotificationFragmentFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      offsetId: // value for 'offsetId'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const OnlineUsersDocument = gql`
    query OnlineUsers($roomId: Int!) {
  onlineUsers(roomId: $roomId) {
    userId
    name
    photo {
      ...PhotoFragment
    }
    isAdmin
    isModerator
    color
  }
}
    ${PhotoFragmentFragmentDoc}`;

/**
 * __useOnlineUsersQuery__
 *
 * To run a query within a React component, call `useOnlineUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnlineUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnlineUsersQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useOnlineUsersQuery(baseOptions: Apollo.QueryHookOptions<OnlineUsersQuery, OnlineUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OnlineUsersQuery, OnlineUsersQueryVariables>(OnlineUsersDocument, options);
      }
export function useOnlineUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnlineUsersQuery, OnlineUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OnlineUsersQuery, OnlineUsersQueryVariables>(OnlineUsersDocument, options);
        }
export type OnlineUsersQueryHookResult = ReturnType<typeof useOnlineUsersQuery>;
export type OnlineUsersLazyQueryHookResult = ReturnType<typeof useOnlineUsersLazyQuery>;
export type OnlineUsersQueryResult = Apollo.QueryResult<OnlineUsersQuery, OnlineUsersQueryVariables>;
export const PopularRoomsDocument = gql`
    query PopularRooms($limit: Int!) {
  popularRooms(limit: $limit) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;

/**
 * __usePopularRoomsQuery__
 *
 * To run a query within a React component, call `usePopularRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularRoomsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePopularRoomsQuery(baseOptions: Apollo.QueryHookOptions<PopularRoomsQuery, PopularRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopularRoomsQuery, PopularRoomsQueryVariables>(PopularRoomsDocument, options);
      }
export function usePopularRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopularRoomsQuery, PopularRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopularRoomsQuery, PopularRoomsQueryVariables>(PopularRoomsDocument, options);
        }
export type PopularRoomsQueryHookResult = ReturnType<typeof usePopularRoomsQuery>;
export type PopularRoomsLazyQueryHookResult = ReturnType<typeof usePopularRoomsLazyQuery>;
export type PopularRoomsQueryResult = Apollo.QueryResult<PopularRoomsQuery, PopularRoomsQueryVariables>;
export const RoomDocument = gql`
    query Room($name: String!) {
  room(name: $name) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;

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
export const RoomsDocument = gql`
    query Rooms {
  rooms {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
      }
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;
export const SearchDocument = gql`
    query Search($query: String!) {
  search(query: $query) {
    users {
      ...AuthorFragment
      photo {
        ...PhotoFragment
      }
    }
    entires {
      ...EntryFragment
    }
    comments {
      ...CommentFragment
      entry {
        ...EntryFragment
      }
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}
${EntryFragmentFragmentDoc}
${CommentFragmentFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const SearchRoomDocument = gql`
    query SearchRoom($name: String!) {
  searchRooms(name: $name) {
    id
    name
    usersNumber
    photo {
      id
      name
      url
    }
  }
}
    `;

/**
 * __useSearchRoomQuery__
 *
 * To run a query within a React component, call `useSearchRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRoomQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchRoomQuery(baseOptions: Apollo.QueryHookOptions<SearchRoomQuery, SearchRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRoomQuery, SearchRoomQueryVariables>(SearchRoomDocument, options);
      }
export function useSearchRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRoomQuery, SearchRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRoomQuery, SearchRoomQueryVariables>(SearchRoomDocument, options);
        }
export type SearchRoomQueryHookResult = ReturnType<typeof useSearchRoomQuery>;
export type SearchRoomLazyQueryHookResult = ReturnType<typeof useSearchRoomLazyQuery>;
export type SearchRoomQueryResult = Apollo.QueryResult<SearchRoomQuery, SearchRoomQueryVariables>;
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    ...AuthorFragment
    photo {
      ...PhotoFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserCommentsDocument = gql`
    query UserComments($userId: Int!, $offsetId: Int!) {
  userComments(userId: $userId, offsetId: $offsetId) {
    ...CommentFragment
    entry {
      id
      slug
      deleted
      room {
        id
        name
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useUserCommentsQuery__
 *
 * To run a query within a React component, call `useUserCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCommentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offsetId: // value for 'offsetId'
 *   },
 * });
 */
export function useUserCommentsQuery(baseOptions: Apollo.QueryHookOptions<UserCommentsQuery, UserCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCommentsQuery, UserCommentsQueryVariables>(UserCommentsDocument, options);
      }
export function useUserCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCommentsQuery, UserCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCommentsQuery, UserCommentsQueryVariables>(UserCommentsDocument, options);
        }
export type UserCommentsQueryHookResult = ReturnType<typeof useUserCommentsQuery>;
export type UserCommentsLazyQueryHookResult = ReturnType<typeof useUserCommentsLazyQuery>;
export type UserCommentsQueryResult = Apollo.QueryResult<UserCommentsQuery, UserCommentsQueryVariables>;
export const UserEntriesDocument = gql`
    query UserEntries($userId: Int!, $offsetId: Int!) {
  userEntries(userId: $userId, offsetId: $offsetId) {
    ...EntryFragment
  }
}
    ${EntryFragmentFragmentDoc}`;

/**
 * __useUserEntriesQuery__
 *
 * To run a query within a React component, call `useUserEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserEntriesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offsetId: // value for 'offsetId'
 *   },
 * });
 */
export function useUserEntriesQuery(baseOptions: Apollo.QueryHookOptions<UserEntriesQuery, UserEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEntriesQuery, UserEntriesQueryVariables>(UserEntriesDocument, options);
      }
export function useUserEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEntriesQuery, UserEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEntriesQuery, UserEntriesQueryVariables>(UserEntriesDocument, options);
        }
export type UserEntriesQueryHookResult = ReturnType<typeof useUserEntriesQuery>;
export type UserEntriesLazyQueryHookResult = ReturnType<typeof useUserEntriesLazyQuery>;
export type UserEntriesQueryResult = Apollo.QueryResult<UserEntriesQuery, UserEntriesQueryVariables>;
export const UserMessagesDocument = gql`
    query UserMessages($userId: Int!, $offsetId: Int!) {
  userMessages(userId: $userId, offsetId: $offsetId) {
    id
    body
    createdAt
    room {
      id
      name
    }
    author {
      ...AuthorFragment
      photo {
        ...PhotoFragment
      }
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;

/**
 * __useUserMessagesQuery__
 *
 * To run a query within a React component, call `useUserMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMessagesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offsetId: // value for 'offsetId'
 *   },
 * });
 */
export function useUserMessagesQuery(baseOptions: Apollo.QueryHookOptions<UserMessagesQuery, UserMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserMessagesQuery, UserMessagesQueryVariables>(UserMessagesDocument, options);
      }
export function useUserMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserMessagesQuery, UserMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserMessagesQuery, UserMessagesQueryVariables>(UserMessagesDocument, options);
        }
export type UserMessagesQueryHookResult = ReturnType<typeof useUserMessagesQuery>;
export type UserMessagesLazyQueryHookResult = ReturnType<typeof useUserMessagesLazyQuery>;
export type UserMessagesQueryResult = Apollo.QueryResult<UserMessagesQuery, UserMessagesQueryVariables>;
export const UserProfileDocument = gql`
    query UserProfile($id: Int!) {
  user(id: $id) {
    ...AuthorFragment
    points
    entriesNumber
    commentsNumber
    messagesNumber
    photo {
      ...PhotoFragment
    }
    createdRooms {
      ...RoomFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${PhotoFragmentFragmentDoc}
${RoomFragmentFragmentDoc}`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
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
export const NotificationDocument = gql`
    subscription Notification {
  notification {
    ...NotificationFragment
  }
}
    ${NotificationFragmentFragmentDoc}`;

/**
 * __useNotificationSubscription__
 *
 * To run a query within a React component, call `useNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NotificationSubscription, NotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationSubscription, NotificationSubscriptionVariables>(NotificationDocument, options);
      }
export type NotificationSubscriptionHookResult = ReturnType<typeof useNotificationSubscription>;
export type NotificationSubscriptionResult = Apollo.SubscriptionResult<NotificationSubscription>;