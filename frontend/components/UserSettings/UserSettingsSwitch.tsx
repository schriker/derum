import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { SettingsSwitchPropsType } from '../../types/settings';
import Switch from '../Switch/Switch';
import useUserSettingsStyles from './UserSettingStyles';

const UserSettingsSwitch = ({
  text,
  value,
  settingKey,
  onChange,
}: SettingsSwitchPropsType) => {
  const classes = useUserSettingsStyles();
  const [checked, setChecked] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(settingKey, event.target.checked);
  };

  return (
    <ListItem classes={classes}>
      <ListItemText primary={text} />
      <ListItemSecondaryAction classes={{ root: classes.secondaryAction }}>
        <Switch checked={checked} onChange={handleChange} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserSettingsSwitch;
