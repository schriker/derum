import React from 'react';
import UserSettingsSwitch from './UserSettingsSwitch';

const UserSettingsShowAvatars = (): JSX.Element => {
  return (
    <UserSettingsSwitch
      text="Pokazuj avatary"
      onChange={(value) => console.log(value)}
    />
  );
};

export default UserSettingsShowAvatars;
