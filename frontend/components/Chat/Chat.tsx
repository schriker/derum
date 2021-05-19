import {
  useInitialMessagesQuery,
  useMessageAddedSubscription,
} from '../../generated/graphql';

const Chat = ({ roomId }: { roomId: number }) => {
  const { data: initialMessages } = useInitialMessagesQuery({
    fetchPolicy: 'network-only',
    variables: {
      roomId: roomId,
    },
  });

  useMessageAddedSubscription({
    variables: {
      roomId: roomId,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data.messageAdded);
    },
  });

  return <div>Test</div>;
};

export default Chat;
