import { makeStyles, Theme } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import DarkTooltip from '../Tooltip/Tooltip';
import UserAvatar from '../UserAvatar/UserAvatar';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: 0,
    marginTop: 10,
  },
  photo: {
    border: '2px solid',
    borderColor: theme.palette.grey[600],
  },
}));

const RoomAvatar = ({ name }: { name: string }) => {
  const classes = useStyles();

  return (
    <Link href={`/p/${name}`}>
      <DarkTooltip title={name} enterDelay={500} placement="right">
        <ButtonIcon className={classes.button}>
          <UserAvatar name={name} src={null} className={classes.photo} />
        </ButtonIcon>
      </DarkTooltip>
    </Link>
  );
};

export default RoomAvatar;
