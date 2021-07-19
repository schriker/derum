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
  authors: string[];
};

export type MessageActionProps = {
  message: {
    __typename?: 'Message';
  } & Pick<Message, 'id' | 'body' | 'createdAt'> & {
      author: { __typename?: 'User' } & AuthorFragmentFragment;
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
