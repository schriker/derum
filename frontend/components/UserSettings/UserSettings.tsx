import { Box } from '@material-ui/core';
import React from 'react';
import { openSettingsModal } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import DarkTooltip from '../Tooltip/Tooltip';

const UserSettings = () => {
  const handleOpen = () => {
    openSettingsModal(true);
  };

  return (
    <Box mx="5px">
      <DarkTooltip title="Ustawienia" enterDelay={500}>
        <ButtonIcon onClick={handleOpen} color="secondary">
          <SettingsIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </DarkTooltip>
    </Box>
  );
};

export default UserSettings;
