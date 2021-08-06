import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  useChangeUserDisplayNameMutation,
  useMeQuery,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { UserProfileUpdateInputs } from '../../types/userSettings';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';

const schema = yup.object().shape({
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
});

const UserSettingsNameForm = () => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileUpdateInputs>({
    resolver: yupResolver(schema),
  });

  const [changeName, { loading }] = useChangeUserDisplayNameMutation({
    onCompleted: (data) => {
      if (data.changeUserDisplayName) {
        globalErrorVar({
          isOpen: true,
          type: 'success',
          message: 'Twoja nazwa została zmieniona.',
        });
      }
    },
    onError: (e) =>
      globalErrorVar({
        isOpen: true,
        message: e.message,
      }),
  });

  useEffect(() => {
    setValue('name', data.me.displayName);
  }, [setValue, data.me.displayName]);

  const onSubmit: SubmitHandler<UserProfileUpdateInputs> = (variables) => {
    if (variables.name !== data.me.displayName) {
      changeName({
        variables,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Box
          pt={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <ButtonPrimary
            disabled={loading}
            style={{ marginLeft: 8 }}
            type="submit"
          >
            Zapisz
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
};

export default UserSettingsNameForm;
