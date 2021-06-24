import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { SettingsSwitchPropsType } from '../../types/settings';
import Switch from '../Switch/Switch';

const UserSettingsSwitch = ({
  text,
  value,
  settingKey,
  onChange,
}: SettingsSwitchPropsType): JSX.Element => {
  const [checked, setChecked] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(settingKey, event.target.checked);
  };

  return (
    <ListItem>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <Switch checked={checked} onChange={handleChange} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserSettingsSwitch;
