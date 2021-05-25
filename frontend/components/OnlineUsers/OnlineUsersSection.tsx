import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { OnlineUser } from '../../generated/graphql';
import { sortUsersMethod } from '../../helpers/sortUsersMethod';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import UserAvatar from '../UserAvatar/UserAvatar';
import useOnlineUsersStyles from './OnlineUsersStyle';

const OnlineUsersSection = ({
  title,
  data,
  handleUserClick,
}: {
  title: string;
  data: OnlineUser[];
  handleUserClick: (id: number) => void;
}) => {
  const classes = useOnlineUsersStyles();

  return !!data.length ? (
    <Box>
      <Typography className={classes.sectionTitle} variant="subtitle1">
        {title}
      </Typography>
      {data.sort(sortUsersMethod).map((user) => (
        <Box key={user.userId}>
          <ButtonPrimary
            className={classes.button}
            onClick={() => handleUserClick(user.userId)}
          >
            <UserAvatar
              className={classes.avatar}
              src={user.photo}
              name={user.name}
            />
            <Typography variant="body1">{user.name}</Typography>
          </ButtonPrimary>
        </Box>
      ))}
    </Box>
  ) : null;
};

export default OnlineUsersSection;
