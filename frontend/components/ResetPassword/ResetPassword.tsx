import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateResetPasswordTokenMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { EmailLoginProps, ResetPasswordInputs } from '../../types/login';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Podaj email.')
    .email('Podaj poprawny adres email.'),
});

const ResetPasswordForm = ({
  onLoading,
  onError,
  setTabIndex,
}: EmailLoginProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: yupResolver(schema),
  });

  const handleError = (error: ApolloError) => {
    onLoading(false);
    onError(true, error);
  };

  const [resetPassword] = useCreateResetPasswordTokenMutation({
    onCompleted: (data) => {
      if (data.createResetPasswordToken) {
        onLoading(false);
        reset({
          email: '',
        });
        globalErrorVar({
          isOpen: true,
          type: 'success',
          message: 'Hasło zostało wysłane na podany email.',
        });
      }
    },
    onError: handleError,
  });

  const onSubmit: SubmitHandler<ResetPasswordInputs> = (variables) => {
    onError(false);
    onLoading(true);

    resetPassword({
      variables,
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="email"
          label="Email"
          control={control}
          error={errors.email}
          inputRender={(field, id) => (
            <CustomInput
              bg="light"
              error={!!errors.email}
              inputProps={{ id: id }}
              placeholder="Adres email"
              {...field}
            />
          )}
        />
        <Box
          pt={2}
          pb={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <ButtonDefault
            onClick={() => {
              setTabIndex(0);
            }}
            type="button"
          >
            Logowanie
          </ButtonDefault>
          <ButtonPrimary style={{ marginLeft: 8 }} type="submit">
            Zresetuj
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
