import { makeStyles, Theme } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import DarkTooltip from '../Tooltip/Tooltip';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { RoomAvatarSidebarStyles } from '../../types/styles';

const useStyles = makeStyles<Theme, RoomAvatarSidebarStyles>(
  (theme: Theme) => ({
    button: {
      padding: 0,
      marginTop: 10,
    },
    photo: (props) => ({
      border: props.isActive ? '2px solid' : '0',
      width: 35,
      height: 35,
      borderColor: props.isActive
        ? theme.palette.primary['A400']
        : 'transparent',
    }),
  })
);

const RoomAvatar = ({
  name,
  photo,
}: {
  name: string;
  photo: string;
}) => {
  const router = useRouter();
  const classes = useStyles({ isActive: router.query.room === name });

  return (
    <Link href={`/p/${name}`} passHref>
      <DarkTooltip title={name} placement="right">
        <ButtonIcon className={classes.button}>
          <AvatarPhoto
            color="#FF026A"
            name={name}
            src={photo}
            className={classes.photo}
          />
        </ButtonIcon>
      </DarkTooltip>
    </Link>
  );
};

export default RoomAvatar;
