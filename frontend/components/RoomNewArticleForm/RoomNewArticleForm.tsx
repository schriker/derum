import dynamic from 'next/dynamic';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NewArticleInputs } from '../../types/newArticle';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import RoomSearchInput from '../RoomSearchInput/RoomSearchInput';
import useNewRoomLinkStyles from '../RoomNewLinkForm/RoomNewLinkFormStyles';
import bodyDefaultValue from './bodyDefaultValue';
import localforage from 'localforage';
import { globalErrorVar } from '../../lib/apolloVars';
import { useCreateArticleMutation } from '../../generated/graphql';
import { Alert } from '@material-ui/lab';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import { useRouter } from 'next/router';
const Markdown = dynamic(() => import('../Markdown/Markdown'));

const STORAGE_KEY_NAME = 'article';

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
  body: yup
    .string()
    .trim()
    .required('Treść jest wymagana.')
    .min(150, 'Trść min. 150 znaków.'),
});

const RoomNewArticleForm = ({
  closeModal,
}: {
  closeModal: () => void;
}): JSX.Element => {
  const classes = useNewRoomLinkStyles();
  const router = useRouter();
  const [oldSession, setOldSession] = useState<NewArticleInputs>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<NewArticleInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      body: bodyDefaultValue,
    },
  });

  const [createArticle, { loading }] = useCreateArticleMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    onCompleted: (data) => {
      localforage.removeItem(STORAGE_KEY_NAME);
      closeModal();
      router.push(
        `/p/${data.createArticle.room.name}/wpis/${data.createArticle.id}/${data.createArticle.slug}`
      );
    },
  });

  useEffect(() => {
    const restoreValues = async () => {
      const values = await localforage.getItem<NewArticleInputs>(
        STORAGE_KEY_NAME
      );
      if (values) setOldSession(values);
    };
    if (!isSubmitted) restoreValues();
    return () => {
      if (
        !isSubmitted &&
        Object.entries(touchedFields).some((value) => value)
      ) {
        localforage.setItem(STORAGE_KEY_NAME, getValues());
      }
    };
  }, [isSubmitted, getValues, touchedFields]);

  const handleResotreSession = () => {
    for (const key in oldSession) {
      setValue(
        key as 'roomId' | 'title' | 'description' | 'body',
        oldSession[key]
      );
    }
    setOldSession(null);
  };

  const onSubmit: SubmitHandler<NewArticleInputs> = (variables) => {
    createArticle({
      variables: {
        newArticleData: {
          ...variables,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {oldSession && (
        <Box mb={1}>
          <Alert
            variant="filled"
            severity="info"
            action={
              <ButtonDefault onClick={handleResotreSession} size="small">
                Przywróć
              </ButtonDefault>
            }
          >
            Wygląda na to, że masz zapisaną sesję, przywrócić?
          </Alert>
        </Box>
      )}
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
          disabled={loading}
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
