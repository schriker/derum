import React from 'react';
import Modal from '../Modal/Modal';
import UserSettingsColor from './UserSettingsColor';
import UserSettingsSwitch from './UserSettingsSwitch';
import UserSettingsNameForm from '../UserSettingsForm/UserSettingsNameForm';
import { List, Typography } from '@material-ui/core';
import { globalErrorVar, openSettingsModal } from '../../lib/apolloVars';
import { SettingsKey } from '../../types/settings';
import { useReactiveVar } from '@apollo/client';
import {
  useMeQuery,
  useUpdateUserSettingsMutation,
} from '../../generated/graphql';

const UserSettingsModal = () => {
  const openModal = useReactiveVar(openSettingsModal);
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

  const handleClose = () => {
    openSettingsModal(false);
  };

  return (
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
          value={data?.me.showNotifications}
        />
        <UserSettingsSwitch
          text="Pokazuj avatary"
          onChange={handleChange}
          settingKey="showAvatars"
          value={data?.me.showAvatars}
        />
        <UserSettingsSwitch
          text="Kolorowe nazwy"
          onChange={handleChange}
          settingKey="showColorNames"
          value={data?.me.showColorNames}
        />
        <UserSettingsColor />
      </List>
      <Typography style={{ margin: '30px 0 10px' }} variant="h5">
        Zmiana nazwy
      </Typography>
      <UserSettingsNameForm />
      {/* <Typography style={{ margin: '20px 0 10px' }} variant="h5">
    Zmiana hasła
  </Typography>
  <UserSettingsPasswordForm /> */}
    </Modal>
  );
};

export default UserSettingsModal;
