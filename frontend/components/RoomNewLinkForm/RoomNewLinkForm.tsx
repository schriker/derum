import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useMetadataLazyQuery } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { NewLinkInputs, NewLinkProps } from '../../types/newLink';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import useRoomNewLinkStyles from './RoomNewLinkFormStyles';

const schema = yup.object().shape({
  url: yup
    .string()
    .trim()
    .required('Adres jest wymagany.')
    .matches(
      /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
      'Podaj poprawny adres url z https.'
    ),
});

const RoomNewLinkForm = ({ setLinkMetadata }: NewLinkProps) => {
  const classes = useRoomNewLinkStyles();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewLinkInputs>({
    resolver: yupResolver(schema),
  });

  const [queryMetadata, { loading }] = useMetadataLazyQuery({
    onCompleted: (data) => {
      reset({
        url: '',
      });
      setLinkMetadata(data.metadata);
    },
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  const onSubmit: SubmitHandler<NewLinkInputs> = (variables) => {
    queryMetadata({
      variables,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="url"
        label="URL"
        control={control}
        error={errors.url}
        inputRender={(field, id) => (
          <CustomInput
            bg="light"
            error={!!errors.url}
            inputProps={{ maxLength: 255, id: id }}
            placeholder="Dodaj link"
            {...field}
          />
        )}
      />
      <ButtonPrimary
        disabled={loading}
        className={classes.submitButton}
        color="primary"
        type="submit"
      >
        Dodaj link
      </ButtonPrimary>
    </form>
  );
};

export default RoomNewLinkForm;
