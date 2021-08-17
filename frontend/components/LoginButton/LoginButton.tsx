import { Hidden } from '@material-ui/core';
import React from 'react';
import { openModalVar } from '../../lib/apolloVars';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import ChatMobileButton from '../Chat/ChatMobileButton';
import UserIcon from '../Icons/UserIcon';
import SearchMobileButton from '../Search/SearchMobileButton';

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
      <Hidden only={['xs', 'xl', 'md', 'lg']}>
        <ChatMobileButton />
        <SearchMobileButton />
      </Hidden>
    </>
  );
};

export default LoginButton;
