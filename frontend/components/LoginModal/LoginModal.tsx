import { Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';
import Modal from '../Modal/Modal';
import GoogleIcon from '../Icons/GoogleIcon';
import TwitterIcon from '../Icons/TwitterIcon';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Alert from '@material-ui/lab/Alert';
import { openModalVar } from '../../lib/apolloVars';
import { useReactiveVar } from '@apollo/client';

const LoginModal = () => {
  const openModal = useReactiveVar(openModalVar);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    setError(error);
  };

  const handleExited = () => {
    setLoading(false);
  };

  return (
    <Modal
      title="Zaloguj się"
      isOpen={openModal}
      close={handleClose}
      exited={handleExited}
    >
      {loading && <LoadingSpinner />}
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          variant="filled"
        >
          Błąd podczas logowania!
        </Alert>
      </Snackbar>
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
