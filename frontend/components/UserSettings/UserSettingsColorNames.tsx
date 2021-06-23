import React from 'react';
import UserSettingsSwitch from './UserSettingsSwitch';

const UserSettingsColorNames = (): JSX.Element => {
  return (
    <UserSettingsSwitch
      text="Kolorowe nazwy"
      onChange={(value) => console.log(value)}
    />
  );
};

export default UserSettingsColorNames;
