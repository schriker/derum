import React from 'react';
import * as yup from 'yup';
import { Box } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import { NewPasswordInputs } from '../../types/newPassword';
import { useChangeUserPasswordMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';

const schema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('Podaj aktualne hasło.')
    .min(6, 'Hasło min. 6 znaków.'),
  newPassword: yup
    .string()
    .trim()
    .required('Podaj nowe hasło.')
    .min(6, 'Hasło min. 6 znaków.'),
  newPasswordConfirmation: yup
    .string()
    .trim()
    .required('Powtórz nowe hasło.')
    .min(6, 'Hasło min. 6 znaków.')
    .oneOf([yup.ref('newPassword'), null], 'Hasła nie pasują do siebie.'),
});

const UserSettingsPasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordInputs>({
    resolver: yupResolver(schema),
  });

  const [changePassword, { loading }] = useChangeUserPasswordMutation({
    onCompleted: (data) => {
      if (data.changeUserPassword) {
        globalErrorVar({
          isOpen: true,
          type: 'success',
          message: 'Hasło zostało zmienione.',
        });
      }
    },
    onError: (e) =>
      globalErrorVar({
        isOpen: true,
        message: e.message,
      }),
  });

  const onSubmit: SubmitHandler<NewPasswordInputs> = (variables) => {
    changePassword({
      variables: {
        changePasswordData: variables,
      },
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="password"
          label="Aktualne hasło"
          control={control}
          error={errors.password}
          inputRender={(field, id) => (
            <CustomInput
              bg="light"
              error={!!errors.password}
              inputProps={{ id: id, type: 'password' }}
              placeholder="Aktualne hasło"
              {...field}
            />
          )}
        />
        <FormInput
          name="newPassword"
          label="Nowe hasło"
          control={control}
          error={errors.newPassword}
          inputRender={(field, id) => (
            <CustomInput
              bg="light"
              error={!!errors.newPassword}
              inputProps={{ id: id, type: 'password' }}
              placeholder="Nowe hasło"
              {...field}
            />
          )}
        />
        <FormInput
          name="newPasswordConfirmation"
          label="Powtórz nowe hasło"
          control={control}
          error={errors.newPasswordConfirmation}
          inputRender={(field, id) => (
            <CustomInput
              bg="light"
              error={!!errors.newPasswordConfirmation}
              inputProps={{ id: id, type: 'password' }}
              placeholder="Powtórz nowe hasło"
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
          <ButtonPrimary
            style={{ marginLeft: 8 }}
            type="submit"
            disabled={loading}
          >
            Zapisz
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
};

export default UserSettingsPasswordForm;
