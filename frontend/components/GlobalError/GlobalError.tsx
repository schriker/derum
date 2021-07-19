import { useReactiveVar } from '@apollo/client';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { globalErrorVar } from '../../lib/apolloVars';

const GlobalError = () => {
  const globalError = useReactiveVar(globalErrorVar);

  return (
    <Snackbar
      open={globalError.isOpen}
      autoHideDuration={6000}
      onClose={() =>
        globalErrorVar({
          isOpen: false,
          message: globalError.message,
          type: globalError.type,
        })
      }
    >
      <Alert
        onClose={() =>
          globalErrorVar({
            isOpen: false,
            message: globalError.message,
            type: globalError.type,
          })
        }
        severity={globalError.type ? globalError.type : 'error'}
        variant="filled"
      >
        {globalError.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalError;
