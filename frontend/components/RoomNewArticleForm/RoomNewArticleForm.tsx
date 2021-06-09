import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NewArticleInputs } from '../../types/newArticle';
import { NewLinkMetadataInputs } from '../../types/newLink';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import RoomSearchInput from '../RoomSearchInput/RoomSearchInput';
import useNewRoomLinkStyles from '../RoomNewLinkForm/RoomNewLinkFormStyles';
import Markdown from '../Markdown/Markdown';
import bodyDefaultValue from './bodyDefaultValue';

const schema = yup.object().shape({
  roomId: yup.number().required('Wybierz pokój.'),
  title: yup
    .string()
    .trim()
    .required('Tytuł jest wymagany.')
    .min(10, 'Tytuł min. 10 znaków.')
    .max(150, 'Zbyt długi tytuł.'),
  description: yup
    .string()
    .trim()
    .required('Opis jest wymagany.')
    .min(50, 'Opis min. 50 znaków.')
    .max(350, 'Zbyt długi opis.'),
  photo: yup
    .string()
    .trim()
    .notRequired()
    .test('photo_check', 'Podaj poprawny adres url z https.', (value) => {
      if (!!value) {
        const schema = yup
          .string()
          .trim()
          .matches(
            /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
            'Podaj poprawny adres url z https.'
          );
        return schema.isValidSync(value);
      }
      return true;
    }),
  body: yup
    .string()
    .trim()
    .required('Treść jest wymagana.')
    .min(150, 'Trść min. 150 znaków.'),
});

const RoomNewArticleForm = () => {
  const classes = useNewRoomLinkStyles();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewArticleInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      body: bodyDefaultValue,
    },
  });

  const onSubmit: SubmitHandler<NewLinkMetadataInputs> = (variables) => {
    console.log(variables);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RoomSearchInput
        error={errors.roomId}
        onSelect={(id: number) =>
          setValue('roomId', id, { shouldValidate: true })
        }
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
        label="Krótki opis"
        control={control}
        error={errors.description}
        inputRender={(field, id) => (
          <CustomInput
            bg="light"
            error={!!errors.description}
            inputProps={{ maxLength: 350, id: id }}
            multiline
            rows={3}
            rowsMax={40}
            {...field}
          />
        )}
      />
      <FormInput
        name="body"
        label="Treść"
        control={control}
        error={errors.body}
        inputRender={(field, id) => (
          <CustomInput
            bg="light"
            error={!!errors.body}
            inputProps={{ id: id }}
            multiline
            rows={5}
            rowsMax={60}
            {...field}
          />
        )}
      />
      <Markdown value={watch('body')} />
      <Box display="flex" justifyContent="flex-end">
        <ButtonPrimary
          disabled={false}
          className={classes.submitButton}
          type="submit"
        >
          Dodaj wpis
        </ButtonPrimary>
      </Box>
    </form>
  );
};

export default RoomNewArticleForm;
