import { Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';
import UserIcon from '../Icons/UserIcon';
import Modal from '../Modal/Modal';
import GoogleIcon from '../Icons/GoogleIcon';
import TwitterIcon from '../Icons/TwitterIcon';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Alert from '@material-ui/lab/Alert';

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setError(false);
    setLoading(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleError = (error: boolean) => {
    setError(error);
  };

  return (
    <>
      <Modal title="Zaloguj się" isOpen={open} close={handleClose}>
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
      <ButtonPrimary
        startIcon={<UserIcon style={{ fontSize: 16 }} />}
        onClick={handleOpen}
        color="primary"
      >
        Zaloguj
      </ButtonPrimary>
    </>
  );
};

export default LoginModal;
