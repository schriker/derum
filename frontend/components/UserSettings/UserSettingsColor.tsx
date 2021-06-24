import { Box, IconButton, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { USER_COLORS } from '../../consts';
import {
  useChangeUserColorMutation,
  useMeQuery,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';

const UserSettingsColor = (): JSX.Element => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
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
      <ListItem>
        <ListItemText primary="Twój kolor" />
      </ListItem>
      <Box pl={2}>
        {USER_COLORS.map((color, index) => (
          <IconButton
            key={index}
            onClick={() => handleClick(color)}
            style={{
              backgroundColor: color,
              marginRight: 8,
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
