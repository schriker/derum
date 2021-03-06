import { Box, Button, Hidden, Typography } from '@material-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import ArrowDropdown from '../Icons/ArrowDropdownIcon';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';

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
        <AvatarPhoto
          styles={{
            border: `3px solid ${data.me.color}`,
            width: 40,
            height: 40,
          }}
          color={data.me.color}
          name={data.me.displayName}
          src={data.me.photo?.url}
        />
        <Hidden xsDown>
          <Typography style={{ marginLeft: 10 }} variant="body1">
            {data.me.displayName}
          </Typography>
          <ArrowDropdown
            style={{ fontSize: 22, marginLeft: 3, paddingTop: 3 }}
          />
        </Hidden>
      </Button>
    </Box>
  ) : null;
};

export default UserButton;
