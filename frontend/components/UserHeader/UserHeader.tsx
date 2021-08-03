import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { polishPlurals } from 'polish-plurals';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import useUserProfileData from '../../hooks/useUserData';
import CoinIcon from '../Icons/CoinIcon';
import UserModalActions from '../UserModal/UsertMoalActions';
import UserHeaderPhoto from './UserHeaderPhoto';
import useHeaderStyles from './UserHeaderStyles';

const UserHeader = () => {
  const { data: profileData } = useUserProfileData();
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useHeaderStyles({
    userColor:
      !userData || userData?.me.showColorNames
        ? profileData.user.color
        : '#fff',
  });

  return (
    <Box className={classes.wrapper}>
      <UserHeaderPhoto userData={profileData} />
      <Box className={classes.content}>
        <Typography variant="h4" className={classes.userName}>
          {profileData.user.displayName}
        </Typography>
        <Box className={classes.title}>
          <CoinIcon className={classes.userIcon} />
          <Typography variant="subtitle1" component="span">
            {profileData.user.points}
            {polishPlurals(
              ' punkt',
              ' punkty',
              ' punktów',
              profileData.user.points
            )}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Użytkownik od:{' '}
          {dayjs(profileData.user.createdAt).format('DD.MM.YYYY')}
        </Typography>
      </Box>
      <UserModalActions id={profileData.user.id} />
    </Box>
  );
};

export default UserHeader;
