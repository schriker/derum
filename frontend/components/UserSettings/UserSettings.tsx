import { Box, List, Typography } from '@material-ui/core';
import React from 'react';
import {
  useMeQuery,
  useUpdateUserSettingsMutation,
} from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import { globalErrorVar } from '../../lib/apolloVars';
import { SettingsKey } from '../../types/settings';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import Modal from '../Modal/Modal';
import DarkTooltip from '../Tooltip/Tooltip';
import UserSettingsNameForm from '../UserSettingsForm/UserSettingsNameForm';
import UserSettingsPasswordForm from '../UserSettingsForm/UserSettingsPasswordForm';
import UserSettingsColor from './UserSettingsColor';
import UserSettingsSwitch from './UserSettingsSwitch';

const UserSettings = () => {
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const [updateUserSettings] = useUpdateUserSettingsMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  const handleChange = (key: SettingsKey, value: boolean) => {
    updateUserSettings({
      variables: {
        newSettingsData: {
          [key]: value,
        },
      },
    });
  };

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
          <UserSettingsSwitch
            text="Powiadomienia"
            onChange={handleChange}
            settingKey="showNotifications"
            value={data.me.showNotifications}
          />
          <UserSettingsSwitch
            text="Pokazuj avatary"
            onChange={handleChange}
            settingKey="showAvatars"
            value={data.me.showAvatars}
          />
          <UserSettingsSwitch
            text="Kolorowe nazwy"
            onChange={handleChange}
            settingKey="showColorNames"
            value={data.me.showColorNames}
          />
          <UserSettingsColor />
        </List>
        <Typography style={{ margin: '30px 0 10px' }} variant="h5">
          Zmiana nazwy
        </Typography>
        <UserSettingsNameForm />
        <Typography style={{ margin: '20px 0 10px' }} variant="h5">
          Zmiana hasła
        </Typography>
        <UserSettingsPasswordForm />
      </Modal>
    </Box>
  );
};

export default UserSettings;
