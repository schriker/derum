import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import {
  NotificationFragmentFragment,
  ObjectTypeEnum,
  useReadNotificationMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import useNotificiationsStyles from './NotificationsStyle';

const NotificationsItem = React.forwardRef<
  HTMLDivElement,
  { data: NotificationFragmentFragment }
>(({ data }, ref) => {
  const classes = useNotificiationsStyles();
  const router = useRouter();
  const [readNotification] = useReadNotificationMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache) => {
      cache.modify({
        fields: {
          newNotificationsNumber: (value) => {
            return value - 1;
          },
        },
      });
    },
  });

  const handleClick = () => {
    router.push(`/${data.url}`);
    readNotification({
      variables: {
        id: data.id,
      },
    });
  };

  const handleMarkReded = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    readNotification({
      variables: {
        id: data.id,
      },
    });
  };

  return (
    <ListItem
      ref={ref}
      button
      className={classes.wrapper}
      onClick={handleClick}
    >
      <ListItemAvatar className={classes.photo}>
        <AvatarPhoto
          styles={{
            width: 25,
            height: 25,
          }}
          color={data.triggeredBy.color}
          src={data.triggeredBy.photo}
          name={data.triggeredBy.displayName}
        />
      </ListItemAvatar>
      <ListItemText>
        <Typography
          style={{ color: data.triggeredBy.color }}
          variant="subtitle1"
          component="span"
        >
          {data.triggeredBy.displayName}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2" component="span">
          {dayjs(data.createdAt).format(' DD.MM - HH:mm')}
        </Typography>
        <Typography variant="subtitle2" component="span">
          {data.objectType === ObjectTypeEnum.COMMENT &&
            ' Skomentował twój wpis.'}
          {data.objectType === ObjectTypeEnum.REPLY &&
            ' Odpowiedział na twój komentarz.'}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        {!data.readed && (
          <Box onClick={handleMarkReded} className={classes.status}></Box>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
});

NotificationsItem.displayName = 'NotificationsItem';

export default React.memo(NotificationsItem, () => true);