import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useResetUserPasswordMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { SetNewPasswordInputs } from '../../types/login';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import useNewPasswordFormStyles from './NewPasswordFormStyles';

const schema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('Podaj hasło.')
    .min(6, 'Hasło min. 6 znaków.'),
  passwordConfirmation: yup
    .string()
    .trim()
    .required('Powtórz hasło.')
    .min(6, 'Hasło min. 6 znaków.')
    .oneOf([yup.ref('password'), null], 'Hasła nie pasują do siebie.'),
});

const NewPasswordForm = () => {
  const router = useRouter();
  const classes = useNewPasswordFormStyles();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SetNewPasswordInputs>({
    resolver: yupResolver(schema),
  });

  const [resetPassword, { loading }] = useResetUserPasswordMutation({
    onCompleted: (data) => {
      if (data.resetUserPassword) {
        router.push('/');
        reset({
          password: '',
          passwordConfirmation: '',
        });
        globalErrorVar({
          isOpen: true,
          type: 'success',
          message: 'Twoje hasło zostało zresetowane.',
        });
      }
    },
    onError: (e) =>
      globalErrorVar({
        isOpen: true,
        message: e.message,
      }),
  });

  const onSubmit: SubmitHandler<SetNewPasswordInputs> = (variables) => {
    resetPassword({
      variables: {
        resetPasswordData: {
          ...variables,
          token: router.query.token as string,
        },
      },
    });
  };

  return (
    <Box className={classes.wrapper}>
      <Box width="sm" className={classes.content}>
        {loading && <LoadingSpinner />}
        <Typography variant="h5" className={classes.title}>
          Zresetuj hasło
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="password"
            label="Hasło"
            control={control}
            error={errors.password}
            inputRender={(field, id) => (
              <CustomInput
                bg="light"
                error={!!errors.password}
                inputProps={{ id: id, type: 'password' }}
                placeholder="Hasło"
                {...field}
              />
            )}
          />
          <FormInput
            name="passwordConfirmation"
            label="Powtórz hasło"
            control={control}
            error={errors.passwordConfirmation}
            inputRender={(field, id) => (
              <CustomInput
                bg="light"
                error={!!errors.passwordConfirmation}
                inputProps={{ id: id, type: 'password' }}
                placeholder="Powtórz hasło"
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
            <ButtonPrimary type="submit">Wyślij</ButtonPrimary>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default NewPasswordForm;
