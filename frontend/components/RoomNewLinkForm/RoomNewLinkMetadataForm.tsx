import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  NewLinkMetadataInputs,
  NewLinkMetadataProps,
} from '../../types/newLink';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import RoomNewLinkPreview from '../RoomNewLinkPreview/RoomNewLinkPreview';
import RoomSearchInput from '../RoomSearchInput/RoomSearchInput';
import useNewRoomLinkStyles from './RoomNewLinkFormStyles';

const schema = yup.object().shape({
  id: yup.number().required('Wybierz pokój.'),
  title: yup
    .string()
    .trim()
    .required('Tytuł jest wymagany.')
    .min(3, 'Tytuł min. 3 znaki.')
    .max(150, 'Zbyt długi tytuł.'),
  description: yup
    .string()
    .trim()
    .required('Opis jest wymagany.')
    .min(100, 'Opis min. 100 znaków.')
    .max(500, 'Zbyt długi opis.'),
  photo: yup
    .string()
    .trim()
    .required('Zdjęcie jest wymagane.')
    .matches(
      /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
      'Podaj poprawny adres url z https.'
    ),
});

const RoomNewLinkMetadataForm = ({
  metadata,
  setLinkMetadata,
}: NewLinkMetadataProps) => {
  const classes = useNewRoomLinkStyles();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewLinkMetadataInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: metadata.title ? metadata.title : '',
      photo: metadata.photo ? metadata.photo : '',
      description: metadata.description ? metadata.description : '',
    },
  });

  const onSubmit: SubmitHandler<NewLinkMetadataInputs> = (variables) => {
    console.log(variables);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RoomSearchInput
        error={errors.id}
        onSelect={(id: number) => setValue('id', id, { shouldValidate: true })}
      />
      <FormInput
        name="title"
        label="Tytuł"
        control={control}
        error={errors.title}
        inputRender={(field, id) => (
          <CustomInput
            bg="light"
            error={!!errors.title}
            inputProps={{ maxLength: 150, id: id }}
            {...field}
          />
        )}
      />
      <FormInput
        name="photo"
        label="Miniaturka"
        control={control}
        error={errors.photo}
        inputRender={(field, id) => (
          <CustomInput
            bg="light"
            error={!!errors.photo}
            inputProps={{ id: id }}
            {...field}
          />
        )}
      />
      <FormInput
        name="description"
        label="Opis"
        control={control}
        error={errors.description}
        inputRender={(field, id) => (
          <CustomInput
            bg="light"
            error={!!errors.description}
            inputProps={{ maxLength: 500, id: id }}
            multiline
            rows={3}
            rowsMax={40}
            {...field}
          />
        )}
      />
      <RoomNewLinkPreview
        metadata={{
          ...metadata,
          title: watch('title'),
          description: watch('description'),
          photo: watch('photo'),
        }}
      />
      <ButtonPrimary
        // disabled={loading}
        onClick={() => setLinkMetadata(null)}
        className={classes.submitButton}
        color="default"
      >
        Wstecz
      </ButtonPrimary>
      <ButtonPrimary
        // disabled={loading}
        className={classes.submitButton}
        color="primary"
        type="submit"
      >
        Dodaj link
      </ButtonPrimary>
    </form>
  );
};

export default RoomNewLinkMetadataForm;
