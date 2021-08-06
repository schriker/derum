import { Badge, Box, createStyles, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  NotificationDocument,
  NotificationSubscription,
  useMeQuery,
  useNewNotificationsNumberQuery,
  useNotificationsQuery,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import BellIcon from '../Icons/BellIcon';
import DarkTooltip from '../Tooltip/Tooltip';
import NotificationsDropdown from './NotificationsDropdown';

const StyledBadge = withStyles(() =>
  createStyles({
    badge: {
      fontWeight: 600,
      fontSize: 14,
      right: -6,
      top: -6,
    },
  })
)(Badge);

const Notifications = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [hasMore, setHasMore] = useState(true);

  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const {
    data,
    subscribeToMore: subscribeToMoreNotifications,
    fetchMore,
  } = useNotificationsQuery({
    variables: {
      offsetId: 0,
    },
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  const handleFetchMore = async () => {
    const {
      data: { notifications },
    } = await fetchMore({
      variables: {
        offsetId: data.notifications[data.notifications.length - 1].id,
      },
    });
    if (!notifications.length) setHasMore(false);
  };

  useEffect(() => {
    if (subscribeToMoreNotifications) {
      subscribeToMoreNotifications<NotificationSubscription>({
        document: NotificationDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, {
            notifications: [
              subscriptionData.data.notification,
              ...prev.notifications,
            ],
          });
        },
      });
    }
  }, [subscribeToMoreNotifications]);

  const { data: newNotificationsNumber, subscribeToMore } =
    useNewNotificationsNumberQuery();

  useEffect(() => {
    subscribeToMore<NotificationSubscription>({
      document: NotificationDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          newNotificationsNumber: prev.newNotificationsNumber + 1,
        });
      },
    });
  }, [subscribeToMore]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box mx="5px">
      <DarkTooltip title="Powiadomienia" enterDelay={500}>
        <ButtonIcon onClick={handleClick} color="secondary">
          <StyledBadge
            badgeContent={
              !userData.me.showNotifications || !newNotificationsNumber
                ? 0
                : newNotificationsNumber.newNotificationsNumber
            }
            color="error"
          >
            <BellIcon style={{ fontSize: 18 }} />
          </StyledBadge>
        </ButtonIcon>
      </DarkTooltip>
      <NotificationsDropdown
        fetchMore={handleFetchMore}
        data={data}
        hasMore={hasMore}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
    </Box>
  );
};

export default Notifications;
