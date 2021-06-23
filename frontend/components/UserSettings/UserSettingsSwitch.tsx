import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import Switch from '../Switch/Switch';

const UserSettingsSwitch = ({
  text,
  onChange,
}: {
  text: string;
  onChange: (value: boolean) => void;
}): JSX.Element => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
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
