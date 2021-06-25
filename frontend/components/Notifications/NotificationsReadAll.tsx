import { Box } from '@material-ui/core';
import React from 'react';
import { useReadAllNotificationMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';

const NotificationsReadAll = React.forwardRef(() => {
  const [readAllNotifications] = useReadAllNotificationMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache) => {
      cache.modify({
        fields: {
          newNotificationsNumber: () => {
            return 0;
          },
          notifications: (value) => {
            value.forEach((item) => {
              cache.modify({
                id: cache.identify(item),
                fields: {
                  readed: () => {
                    return true;
                  },
                },
              });
            });

            return value;
          },
        },
      });
    },
  });

  const clickHandler = () => {
    readAllNotifications();
  };

  return (
    <Box display="flex" justifyContent="center" mb={2} mt={1}>
      <ButtonSecondary onClick={clickHandler}>
        Oznacz wszystkie jako odczytane
      </ButtonSecondary>
    </Box>
  );
});

NotificationsReadAll.displayName = 'NotificationsReadAll';

export default NotificationsReadAll;
