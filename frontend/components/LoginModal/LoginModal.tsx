import { ApolloError, useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import CreateNewUserForm from '../CreateNewUser/CreateNewUserForm';
import EmailLoginForm from '../EmailLoginForm/EmailLoginForm';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Modal from '../Modal/Modal';
import ResetPasswordForm from '../ResetPassword/ResetPassword';
import TabPanel from '../TabPanel/TabPanel';

const LoginModal = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const openModal = useReactiveVar(openModalVar);
  const [loading, setLoading] = useState(false);
  const title = ['Zaloguj się', 'Zarejestruj się', 'Zresetuj hasło'];
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
      fullWidth
      title={title[tabIndex]}
      open={openModal}
      close={handleClose}
      exited={handleExited}
      maxWidth="sm"
    >
      {loading && <LoadingSpinner />}
      <TabPanel value={tabIndex} index={0}>
        <EmailLoginForm
          onLoading={handleLoading}
          onSuccess={handleClose}
          onError={handleError}
          setTabIndex={setTabIndex}
        />
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
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <CreateNewUserForm
          onLoading={handleLoading}
          onSuccess={handleClose}
          onError={handleError}
          setTabIndex={setTabIndex}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <ResetPasswordForm
          onLoading={handleLoading}
          onSuccess={handleClose}
          onError={handleError}
          setTabIndex={setTabIndex}
        />
      </TabPanel>
    </Modal>
  );
};

export default LoginModal;
