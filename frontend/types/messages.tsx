import { Message, User } from '../generated/graphql';

export type ChatMessagesItemProps = {
  message: {
    __typename?: 'Message';
  } & Pick<Message, 'id' | 'body' | 'createdAt'> & {
      author: {
        __typename?: 'User';
      } & {
        __typename?: 'User';
      } & Pick<
          User,
          'id' | 'displayName' | 'photo' | 'isAdmin' | 'isModerator'
        >;
    };
  userId: number | null;
  setUserId: (id: number) => void;
  handleOpen: () => void;
};

export type MessageActionProps = {
  messageId: number;
};
