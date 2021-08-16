import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { EmojisPropsType } from '../../types/emojis';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import EmojisPicker from '../EmojisPicker/EmojisPicker';
import EmoticonsIcon from '../Icons/EmoticonsIcon';

const Emojis = ({ onSelect, setInpuFocus }: EmojisPropsType) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (name: string) => {
    setAnchorEl(null);
    onSelect(name);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <InputAdornment position="end">
      <EmojisPicker
        setInpuFocus={setInpuFocus}
        isOpen={isOpen}
        onSelect={handleSelect}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
      <ButtonIcon
        aria-label="Emojis"
        onClick={handleClick}
        color="secondary"
        size="small"
      >
        <EmoticonsIcon style={{ fontSize: 24 }} />
      </ButtonIcon>
    </InputAdornment>
  );
};

export default Emojis;
