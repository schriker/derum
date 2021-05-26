import { useEffect } from 'react';
import {
  MessageAddedSubscription,
  MessageAddedDocument,
  MessageDeletedSubscription,
  MessageDeletedDocument,
  useInitialMessagesQuery,
  useMeQuery,
} from '../generated/graphql';
import { wsLink } from '../lib/apolloClient';
import { globalErrorVar } from '../lib/apolloVars';

const useChatSubscriptions = (roomId: number) => {
  const { data, subscribeToMore } = useInitialMessagesQuery({
    fetchPolicy: 'cache-first',
    variables: {
      roomId: roomId,
    },
  });

  const { data: user } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  useEffect(() => {
    // Reestablish ws connection with new user credentials hacky as hell :(
    // @ts-ignore
    wsLink?.subscriptionClient.close();
    // @ts-ignore
    wsLink?.subscriptionClient.connect();
  }, [user?.me.id]);

  useEffect(() => {
    subscribeToMore<MessageAddedSubscription>({
      document: MessageAddedDocument,
      variables: {
        roomId: roomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        const prevMessages = [...prev.initialMessages];
        return Object.assign({}, prev, {
          initialMessages: [newMessage, ...prevMessages.slice(0, -1)],
        });
      },
    });

    subscribeToMore<MessageDeletedSubscription>({
      document: MessageDeletedDocument,
      variables: {
        roomId: roomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        if (user) {
          if (subscriptionData.data.messageDeleted.author.id === user.me.id) {
            globalErrorVar({
              isOpen: true,
              message: 'Twoja wiadomość została usunięta.',
            });
          }
        }
        const {
          data: {
            messageDeleted: { id },
          },
        } = subscriptionData;
        const messages = prev.initialMessages.filter(
          (message) => message.id !== id
        );
        return Object.assign({}, prev, {
          initialMessages: messages,
        });
      },
    });
  }, [user?.me.id, roomId]);

  return {
    data,
  };
};

export default useChatSubscriptions;
