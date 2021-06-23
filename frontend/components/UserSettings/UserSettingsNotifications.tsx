import React from 'react';
import UserSettingsSwitch from './UserSettingsSwitch';

const UserSettingsNotifications = (): JSX.Element => {
  return (
    <UserSettingsSwitch
      text="Powiadomienia"
      onChange={(value) => console.log(value)}
    />
  );
};

export default UserSettingsNotifications;
