// @ts-nocheck
import { useEffect, useState } from 'react';
import { wsLink } from '../lib/apolloClient';

const useIsConnected = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    wsLink?.subscriptionClient.onDisconnected(() => {
      setIsConnected(false);
    });
    wsLink?.subscriptionClient.onConnected(() => {
      setIsConnected(true);
    });
    wsLink?.subscriptionClient.onReconnecting(() => {
      setIsConnected(true);
    });
  }, []);

  return isConnected;
};

export default useIsConnected;
