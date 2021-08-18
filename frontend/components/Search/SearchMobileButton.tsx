import { Box } from '@material-ui/core';
import React from 'react';
import { openSearchModal } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import SearchIcon from '../Icons/SearchIcon';
import DarkTooltip from '../Tooltip/Tooltip';

const SearchMobileButton = () => {
  const handleOpen = () => {
    openSearchModal(true);
  };

  return (
    <Box mx="5px">
      <DarkTooltip title="Ustawienia" enterDelay={500}>
        <ButtonIcon onClick={handleOpen} color="secondary">
          <SearchIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </DarkTooltip>
    </Box>
  );
};

export default SearchMobileButton;
