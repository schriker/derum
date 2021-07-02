import React from 'react';
import { Controller } from 'react-hook-form';
import { FormInputTypeProps } from '../../types/form';
import { FormControl, InputLabel, Typography } from '@material-ui/core';

const FormInput = ({
  name,
  control,
  label,
  inputRender,
  error,
}: FormInputTypeProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormControl style={{ width: '100%', margin: '0 0 10px 0' }}>
          <InputLabel
            style={{ fontSize: 18 }}
            error={!!error}
            shrink
            htmlFor={name}
          >
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
