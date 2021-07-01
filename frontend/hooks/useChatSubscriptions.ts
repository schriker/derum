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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import PopSound from '../public/pop.mp3';

const useChatSubscriptions = (roomId: number) => {
  const { data, subscribeToMore, refetch } = useInitialMessagesQuery({
    fetchPolicy: 'cache-first',
    variables: {
      roomId: roomId,
    },
  });

  const { data: user } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  useEffect(() => {
    refetch();
  }, [roomId, refetch]);

  useEffect(() => {
    // Reestablish ws connection with new user credentials hacky as hell :(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wsLink?.subscriptionClient.close();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wsLink?.subscriptionClient.connect();
  }, [user?.me.id, user?.me.color, roomId]);

  useEffect(() => {
    const pop = new Audio(PopSound);
    subscribeToMore<MessageAddedSubscription>({
      document: MessageAddedDocument,
      variables: {
        roomId: roomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        const mentions =
          subscriptionData.data.messageAdded.body.match(/\B@\w*/g);
        if (
          mentions?.includes(
            `@${subscriptionData.data.messageAdded.author.displayName}`
          )
        ) {
          pop.play();
        }
        const prevMessages = [...prev.initialMessages];
        const slicedPrevMessages =
          prevMessages.length > 100
            ? [...prevMessages.slice(0, -1)]
            : [...prevMessages];
        return Object.assign({}, prev, {
          initialMessages: [newMessage, ...slicedPrevMessages],
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
  }, [user?.me.id, user?.me.color, roomId, subscribeToMore, user]);

  return {
    data,
  };
};

export default useChatSubscriptions;
