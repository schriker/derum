import { AuthorFragmentFragment, Message } from '../generated/graphql';

export type ChatMessagesItemProps = {
  message: {
    __typename?: 'Message';
  } & Pick<Message, 'id' | 'body' | 'createdAt'> & {
      author: { __typename?: 'User' } & AuthorFragmentFragment;
    };
  userId: number | null;
  setUserId: (id: number) => void;
  handleOpen: () => void;
};

export type MessageActionProps = {
  messageId: number;
};
