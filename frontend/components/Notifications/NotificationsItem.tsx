import { Box, Typography } from '@material-ui/core';
import React from 'react';
import {
  NotificationFragmentFragment,
  ObjectTypeEnum,
  useReadNotificationMutation,
} from '../../generated/graphql';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import useNotificiationsStyles from './NotificationsStyle';
import Link from 'next/link';
import { globalErrorVar } from '../../lib/apolloVars';

const NotificationsItem = React.forwardRef<
  HTMLAnchorElement,
  { data: NotificationFragmentFragment }
>(({ data }, ref) => {
  const classes = useNotificiationsStyles();

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

  const handleMarkReded = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    readNotification({
      variables: {
        id: data.id,
      },
    });
  };

  return (
    <Link href={`/${data.url}`}>
      <a ref={ref} className={classes.link}>
        <Box className={classes.wrapper} width={300} px={1}>
          <Box className={classes.photo}>
            <AvatarPhoto
              styles={{
                width: 25,
                height: 25,
              }}
              color={data.triggeredBy.color}
              src={data.triggeredBy.photo}
              name={data.triggeredBy.displayName}
            />
          </Box>
          <Box className={classes.message}>
            <Typography
              style={{ color: data.triggeredBy.color }}
              variant="subtitle1"
              component="span"
            >
              {data.triggeredBy.displayName}
            </Typography>
            <Typography variant="subtitle2" component="span">
              {data.objectType === ObjectTypeEnum.COMMENT &&
                ' skomentował twój wpis.'}
              {data.objectType === ObjectTypeEnum.REPLY &&
                ' odpowiedział na twój komentarz.'}
            </Typography>
          </Box>
          {!data.readed && (
            <Box onClick={handleMarkReded} className={classes.status}></Box>
          )}
        </Box>
      </a>
    </Link>
  );
});

NotificationsItem.displayName = 'NotificationsItem';

export default NotificationsItem;
