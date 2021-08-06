import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { NotificationsDropdownPropsType } from '../../types/notifications';
import Dropdown from '../Dropdown/Dropdown';
import NotificationsItem from './NotificationsItem';
import NotificationsLoadMore from './NotificationsLoadMore';
import NotificationsReadAll from './NotificationsReadAll';

const NotificationsDropdown = ({
  anchorEl,
  handleClose,
  data,
  fetchMore,
  hasMore,
}: NotificationsDropdownPropsType) => {
  return data ? (
    <Dropdown
      id="notifications"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <NotificationsReadAll />
      {data.notifications.length ? (
        data.notifications.map((item) => (
          <NotificationsItem key={item.id} data={item} />
        ))
      ) : (
        <Box textAlign="center" py={2}>
          <Typography variant="body1" color="textSecondary">
            Brak powiadomień.
          </Typography>
        </Box>
      )}
      {!!data.notifications.length && hasMore && (
        <NotificationsLoadMore fetchMore={fetchMore} />
      )}
    </Dropdown>
  ) : null;
};

export default NotificationsDropdown;
