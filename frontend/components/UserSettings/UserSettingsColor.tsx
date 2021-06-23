import { Box, IconButton, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { USER_COLORS } from '../../consts';

const UserSettingsColor = (): JSX.Element => {
  return (
    <>
      <ListItem>
        <ListItemText primary="Twój kolor" />
      </ListItem>
      <Box pl={2}>
        {USER_COLORS.map((color, index) => (
          <IconButton
            key={index}
            style={{
              backgroundColor: color,
              height: 30,
              width: 30,
              marginRight: 8,
              // border: '5px solid white',
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default UserSettingsColor;
