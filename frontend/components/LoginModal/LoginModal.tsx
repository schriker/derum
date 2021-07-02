import React, { useState } from 'react';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';
import Modal from '../Modal/Modal';
import TwitterIcon from '../Icons/TwitterIcon';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { ApolloError, useReactiveVar } from '@apollo/client';
import GoogleLogin from '../GoogleLogin/GoogleLogin';

const LoginModal = () => {
  const openModal = useReactiveVar(openModalVar);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    openModalVar(false);
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleError = (open: boolean, error?: ApolloError) => {
    if (open) {
      setLoading(false);
    }
    globalErrorVar({
      isOpen: open,
      message: error ? error.message : 'Błąd podczas logowania.',
    });
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
      <GoogleLogin
        onLoading={handleLoading}
        onSuccess={handleClose}
        onError={handleError}
      />
      <ButtonSocialLogin startIcon={<TwitterIcon />} provider="twitter">
        Zaloguj przez Twitter (Wkrótce)
      </ButtonSocialLogin>
    </Modal>
  );
};

export default LoginModal;
