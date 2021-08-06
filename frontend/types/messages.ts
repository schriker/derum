import {
  AuthorFragmentFragment,
  Message,
  PhotoFragmentFragment,
  Room,
} from '../generated/graphql';
export type Maybe<T> = T | null;

export type ChatMessagesItemProps = {
  message: {
    __typename?: 'Message';
  } & Pick<Message, 'id' | 'body' | 'createdAt'> & {
      author: { __typename?: 'User' } & {
        photo?: Maybe<{ __typename?: 'Photo' } & PhotoFragmentFragment>;
      } & AuthorFragmentFragment;
      room?: {
        __typename?: 'Room';
      } & Pick<Room, 'id' | 'name'>;
    };
  userId: number | null;
  setUserId: (id: number) => void;
  handleOpen: () => void;
  authors?: string[];
  isUserProfileView?: boolean;
};

export type MessageActionProps = {
  message: {
    __typename?: 'Message';
  } & Pick<Message, 'id' | 'body' | 'createdAt'> & {
      author: { __typename?: 'User' } & {
        photo?: Maybe<{ __typename?: 'Photo' } & PhotoFragmentFragment>;
      } & AuthorFragmentFragment;
    };
};

export type ChatMessageNode = {
  type: 'emoji' | 'text';
  value: string;
  component: React.ReactNode;
};

export type ChatMessageUserStylesPropsType = {
  isCurrentUser: boolean;
};

export type ChatMessageUserPropsType = {
  value: string;
};

export type ChatMessageBodyPrpsType = {
  body: string;
  authors: string[];
};
