import { Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { SearchUsersListProps } from '../../types/search';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { ButtonBlank } from '../Buttons/ButtonBlank';
import useSearchListStyles from './SearchListStyles';

const SearchUsersList = ({ users }: SearchUsersListProps) => {
  const router = useRouter();
  const classes = useSearchListStyles();

  const handleClick = (id: number) => {
    router.push(`/u/${id}`);
  };

  return users.length ? (
    <Box>
      <Typography variant="subtitle1" className={classes.sectionTitle}>
        Użytkownicy
      </Typography>
      {users.map((user) => (
        <Box key={user.id}>
          <ButtonBlank
            className={classes.button}
            onClick={() => handleClick(user.id)}
          >
            <AvatarPhoto
              className={classes.avatar}
              src={user.photo?.url}
              name={user.displayName}
              color={user.color}
            />
            <Typography variant="body1">{user.displayName}</Typography>
          </ButtonBlank>
        </Box>
      ))}
    </Box>
  ) : null;
};

export default SearchUsersList;
