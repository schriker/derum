import React from 'react';
import { NotificationsDropdownPropsType } from '../../types/notifications';
import Dropdown from '../Dropdown/Dropdown';
import NotificationsItem from './NotificationsItem';
import NotificationsReadAll from './NotificationsReadAll';

const NotificationsDropdown = ({
  anchorEl,
  handleClose,
  data,
}: NotificationsDropdownPropsType): JSX.Element => {
  return data ? (
    <Dropdown
      id="notifications"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <NotificationsReadAll />
      {data.notifications.map((item) => (
        <NotificationsItem key={item.id} data={item} />
      ))}
    </Dropdown>
  ) : null;
};

export default NotificationsDropdown;
