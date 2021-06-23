import { Box, List } from '@material-ui/core';
import React from 'react';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import Modal from '../Modal/Modal';
import DarkTooltip from '../Tooltip/Tooltip';
import UserSettingsColor from './UserSettingsColor';
import UserSettingsColorNames from './UserSettingsColorNames';
import UserSettingsNotifications from './UserSettingsNotifications';
import UserSettingsShowAvatars from './UserSettingsShowAvatars';

const UserSettings = (): JSX.Element => {
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();

  return (
    <Box mx="5px">
      <DarkTooltip title="Ustawienia" enterDelay={500}>
        <ButtonIcon onClick={handleOpen} color="secondary">
          <SettingsIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </DarkTooltip>
      <Modal
        title="Ustawienia"
        fullWidth
        maxWidth="xs"
        open={openModal}
        close={handleClose}
      >
        <List>
          <UserSettingsNotifications />
          <UserSettingsShowAvatars />
          <UserSettingsColorNames />
          <UserSettingsColor />
        </List>
      </Modal>
    </Box>
  );
};

export default UserSettings;
