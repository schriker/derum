import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useMeQuery } from '../../generated/graphql';
import { UserProfileUpdateInputs } from '../../types/userSettings';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';

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

const UserSettingsPasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileUpdateInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserProfileUpdateInputs> = (variables) => {
    console.log(variables);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="password"
          label="Nowe hasło"
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
          pt={1}
          pb={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <ButtonPrimary style={{ marginLeft: 8 }} type="submit">
            Zapisz
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
};

export default UserSettingsPasswordForm;
