import { Box, IconButton, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { USER_COLORS } from '../../consts';
import {
  useChangeUserColorMutation,
  useMeQuery,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import useUserSettingsStyles from './UserSettingStyles';

const UserSettingsColor = () => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useUserSettingsStyles();
  const [changeUserColor] = useChangeUserColorMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  const handleClick = (color: string) => {
    changeUserColor({
      variables: {
        color,
      },
    });
  };

  return (
    <>
      <ListItem classes={classes}>
        <ListItemText primary="Twój kolor" />
      </ListItem>
      <Box>
        {USER_COLORS.map((color, index) => (
          <IconButton
            key={index}
            onClick={() => handleClick(color)}
            style={{
              backgroundColor: color,
              marginRight: 8,
              marginBottom: 5,
              border:
                color === data?.me.color
                  ? '5px solid white'
                  : '5px solid transparent',
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default UserSettingsColor;
