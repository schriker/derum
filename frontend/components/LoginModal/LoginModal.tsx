import React, { useState } from 'react';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';
import Modal from '../Modal/Modal';
import GoogleIcon from '../Icons/GoogleIcon';
import TwitterIcon from '../Icons/TwitterIcon';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { useReactiveVar } from '@apollo/client';

const LoginModal = (): JSX.Element => {
  const openModal = useReactiveVar(openModalVar);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    openModalVar(false);
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleError = (error: boolean) => {
    if (error) {
      setLoading(false);
    }
    globalErrorVar({ isOpen: error, message: 'Błąd podczas logowania!' });
  };

  const handleExited = () => {
    setLoading(false);
  };

  return (
    <Modal
      title="Zaloguj się"
      open={openModal}
      close={handleClose}
      exited={handleExited}
    >
      {loading && <LoadingSpinner />}
      <FacebookLogin
        onLoading={handleLoading}
        onSuccess={handleClose}
        onError={handleError}
      />
      <ButtonSocialLogin startIcon={<GoogleIcon />} provider="google">
        Zaloguj przez Google
      </ButtonSocialLogin>
      <ButtonSocialLogin startIcon={<TwitterIcon />} provider="twitter">
        Zaloguj przez Twitter
      </ButtonSocialLogin>
    </Modal>
  );
};

export default LoginModal;
