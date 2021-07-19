import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, Link, Typography } from '@material-ui/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  useLoginUserWithEmailMutation,
  useMeLazyQuery,
} from '../../generated/graphql';
import { EmailLoginInputs, EmailLoginProps } from '../../types/login';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import useEmailLoginFormStyles from './EmailLoginFormStyles';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Podaj email.')
    .email('Podaj poprawny adres email.'),
  password: yup
    .string()
    .trim()
    .required('Podaj hasło.')
    .min(6, 'Hasło min. 6 znaków.'),
});

const EmailLoginForm = ({
  onLoading,
  onError,
  onSuccess,
  setTabIndex,
}: EmailLoginProps) => {
  const classes = useEmailLoginFormStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginInputs>({
    resolver: yupResolver(schema),
  });

  const handleError = (error: ApolloError) => {
    onLoading(false);
    onError(true, error);
  };

  const [fetchUser] = useMeLazyQuery({
    onError: handleError,
    onCompleted: (data) => {
      if (data.me) onSuccess();
    },
  });

  const [login] = useLoginUserWithEmailMutation({
    onCompleted: (data) => {
      if (data.loginUserWithEmail) fetchUser();
    },
    update(cache, { data: { loginUserWithEmail } }) {
      if (loginUserWithEmail) {
        cache.reset();
      }
    },
    onError: handleError,
  });

  const onSubmit: SubmitHandler<EmailLoginInputs> = (variables) => {
    onError(false);
    onLoading(true);
    login({
      variables,
    });
  };

  return (
    <Box className={classes.wrapper}>
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
        <Box
          pt={1}
          pb={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography>
              <Link
                component="button"
                color="primary"
                variant="body1"
                type="button"
                onClick={() => {
                  setTabIndex(1);
                }}
              >
                Zarejestruj nowe konto.
              </Link>
            </Typography>
            <Typography>
              <Link
                component="button"
                color="primary"
                variant="body1"
                type="button"
                onClick={() => {
                  setTabIndex(2);
                }}
              >
                Nie pamiętam hasła.
              </Link>
            </Typography>
          </Box>
          <ButtonPrimary type="submit">Zaloguj</ButtonPrimary>
        </Box>
      </form>
      <Box className={classes.divider}>
        <Typography color="textSecondary" className={classes.or}>
          lub
        </Typography>
        <Divider />
      </Box>
    </Box>
  );
};

export default EmailLoginForm;
