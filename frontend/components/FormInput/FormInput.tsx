import { FormControl, InputLabel, Typography } from '@material-ui/core';
import React from 'react';
import { Controller, FieldError } from 'react-hook-form';

const FormInput = ({
  name,
  control,
  label,
  inputRender,
  error,
}: {
  name: string;
  control: any;
  label: string;
  error: FieldError;
  inputRender: (field: any, id: string) => any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormControl style={{ width: '100%', margin: '0 0 10px 0' }}>
          <InputLabel error={!!error} shrink htmlFor={name}>
            {label}
          </InputLabel>
          {inputRender(field, name)}
          {!!error && (
            <Typography variant="subtitle1" color="error">
              {error.message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

export default FormInput;
