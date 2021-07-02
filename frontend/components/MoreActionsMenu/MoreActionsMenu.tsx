import React, { useState } from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import Dropdown from '../Dropdown/Dropdown';
import MoreIcon from '../Icons/MoreIcon';

const MoreActionsMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonIcon onClick={handleClick} size="small" color="secondary">
        <MoreIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
      <Dropdown
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Dropdown>
    </>
  );
};

export default MoreActionsMenu;
