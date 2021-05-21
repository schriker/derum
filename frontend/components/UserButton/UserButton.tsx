import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import ArrowDropdown from '../Icons/ArrowDropdownIcon';
import UserAvatar from '../UserAvatar/UserAvatar';

const UserButton = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { data } = useMeQuery();

  return data ? (
    <Box display="flex" alignItems="center">
      <Button
        style={{ textTransform: 'none' }}
        onClick={onClick}
        aria-controls="user-menu"
        aria-haspopup="true"
      >
        <UserAvatar
          styles={{
            border: '2px solid #FF026A',
            width: 40,
            height: 40,
            backgroundColor: '#FF026A',
          }}
          name={data.me.displayName}
          src={data.me.photo}
        />
        <Typography style={{ marginLeft: 10 }} variant="body1">
          {data.me.displayName}
        </Typography>
        <ArrowDropdown style={{ fontSize: 22, marginLeft: 3, paddingTop: 3 }} />
      </Button>
    </Box>
  ) : null;
};

export default UserButton;
