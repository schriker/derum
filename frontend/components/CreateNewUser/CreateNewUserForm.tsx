import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Link, Typography } from '@material-ui/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateNewUserMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { EmailLoginProps, EmailRegisterInputs } from '../../types/login';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import NextLink from 'next/link';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Podaj email.')
    .email('Podaj poprawny adres email.'),
  name: yup
    .string()
    .trim()
    .required('Podaj nazwę użytkonwika.')
    .min(3, 'Nazwa min. 3 znaki.')
    .max(25, 'Nazwa max. 25 znaków.')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Nazwa może zawierać tylko znaki alfanumeryczne.'
    ),
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

const CreateNewUserForm = ({
  onLoading,
  onError,
  setTabIndex,
}: EmailLoginProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailRegisterInputs>({
    resolver: yupResolver(schema),
  });

  const handleError = (error: ApolloError) => {
    onLoading(false);
    onError(true, error);
  };

  const [register] = useCreateNewUserMutation({
    onCompleted: (data) => {
      if (data.createNewUser) {
        onLoading(false);
        reset({
          email: '',
          name: '',
          password: '',
          passwordConfirmation: '',
        });
        globalErrorVar({
          isOpen: true,
          type: 'success',
          message: 'Konto zostało utworzone. Potwierdź adres email.',
        });
      }
    },
    onError: handleError,
  });

  const onSubmit: SubmitHandler<EmailRegisterInputs> = (variables) => {
    onError(false);
    onLoading(true);

    register({
      variables: {
        newUserData: variables,
      },
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
        <FormInput
          name="name"
          label="Nazwa"
          control={control}
          error={errors.name}
          inputRender={(field, id) => (
            <CustomInput
              bg="light"
              error={!!errors.name}
              inputProps={{ id: id }}
              placeholder="Nazwa użytkonwika"
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
        <Typography>
          Zakładając konto akceptujesz{' '}
          <NextLink href="/" passHref>
            <Link target="_blank" rel="noreferrer" color="primary">
              regulamin
            </Link>
          </NextLink>{' '}
          oraz{' '}
          <NextLink href="/" passHref>
            <Link target="_blank" rel="noreferrer" color="primary">
              warunki prywatności
            </Link>
          </NextLink>
          .
        </Typography>
        <Box
          pt={3}
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
            Zarejestruj
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
};

export default CreateNewUserForm;
