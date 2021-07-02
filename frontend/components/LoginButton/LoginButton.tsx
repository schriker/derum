import React from 'react';
import { openModalVar } from '../../lib/apolloVars';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import UserIcon from '../Icons/UserIcon';

const LoginButton = () => {
  return (
    <>
      <ButtonPrimary
        style={{ marginRight: 8 }}
        startIcon={<UserIcon style={{ fontSize: 16 }} />}
        onClick={() => openModalVar(true)}
        size="large"
      >
        Zaloguj
      </ButtonPrimary>
    </>
  );
};

export default LoginButton;
