import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { OnlineUser } from '../../generated/graphql';
import { sortUsersMethod } from '../../helpers/sortUsersMethod';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import useOnlineUsersStyles from './OnlineUsersStyle';
import { ButtonBlank } from '../Buttons/ButtonBlank';

const OnlineUsersSection = ({
  title,
  data,
  handleUserClick,
}: {
  title: string;
  data: OnlineUser[];
  handleUserClick: (id: number) => void;
}): JSX.Element => {
  const classes = useOnlineUsersStyles();

  return data.length ? (
    <Box>
      <Typography className={classes.sectionTitle} variant="subtitle1">
        {title}
      </Typography>
      {data.sort(sortUsersMethod).map((user) => (
        <Box key={user.userId}>
          <ButtonBlank
            className={classes.button}
            onClick={() => handleUserClick(user.userId)}
          >
            <AvatarPhoto
              className={classes.avatar}
              src={user.photo}
              name={user.name}
              color={user.color}
            />
            <Typography variant="body1">{user.name}</Typography>
          </ButtonBlank>
        </Box>
      ))}
    </Box>
  ) : null;
};

export default OnlineUsersSection;
