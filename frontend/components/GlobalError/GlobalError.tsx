import { useReactiveVar } from '@apollo/client';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { globalErrorVar } from '../../lib/apolloVars';

const GlobalError = (): JSX.Element => {
  const globalError = useReactiveVar(globalErrorVar);

  return (
    <Snackbar
      open={globalError.isOpen}
      autoHideDuration={6000}
      onClose={() =>
        globalErrorVar({ isOpen: false, message: globalError.message })
      }
    >
      <Alert
        onClose={() =>
          globalErrorVar({ isOpen: false, message: globalError.message })
        }
        severity="error"
        variant="filled"
      >
        {globalError.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalError;
