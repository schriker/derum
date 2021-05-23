import { useEffect } from 'react';
import {
  MessageAddedSubscription,
  MessageAddedDocument,
  MessageDeletedSubscription,
  MessageDeletedDocument,
  useInitialMessagesQuery,
  useMeQuery,
  useMessageDeletedSubscription,
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
    if (user) {
      // @ts-ignore
      wsLink?.subscriptionClient.close(true, true);
      // @ts-ignore
      wsLink?.subscriptionClient.connect();
    }
  }, [user]);

  // useMessageDeletedSubscription({
  //   variables: {
  //     roomId,
  //   },
  //   onSubscriptionComplete: () => {
  //     console.log('Test');
  //   },
  //   onSubscriptionData: (data) => {
  //     console.log(user);
  //     if (!user) return;
  //     if (data.subscriptionData.data.messageDeleted.author.id === user.me.id) {
  //       globalErrorVar({
  //         isOpen: true,
  //         message: 'Twoja wiadomość została usunięta.',
  //       });
  //     }
  //   },
  // });

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
        if (user) {
          if (subscriptionData.data.messageDeleted.author.id === user.me.id) {
            globalErrorVar({
              isOpen: true,
              message: 'Twoja wiadomość została usunięta.',
            });
          }
        }
        if (!subscriptionData.data) return prev;
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
  }, [user, roomId]);

  return {
    data,
  };
};

export default useChatSubscriptions;
