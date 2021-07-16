import dynamic from 'next/dynamic';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import PhotoUploadInput from '../PhotoUploadInput/PhotoUploadInput';
import schema from './RoomNewArticleSchema';
const Markdown = dynamic(() => import('../Markdown/Markdown'));

const STORAGE_KEY_NAME = 'article';

const RoomNewArticleForm = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const classes = useNewRoomLinkStyles();
  const router = useRouter();
  const [oldSession, setOldSession] = useState<NewArticleInputs>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
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
        `/p/${data.createArticle.room.name}/w/${data.createArticle.id}/${data.createArticle.slug}`
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
        localforage.setItem(STORAGE_KEY_NAME, {
          ...getValues(),
          photo: null,
        });
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
          roomId: variables.roomId,
          title: variables.title,
          description: variables.description,
          body: variables.body,
        },
        photo: variables.photo ? variables.photo[0] : null,
      },
    });
  };

  const onSelect = useCallback(
    (id: number) => {
      setValue('roomId', id, { shouldValidate: true });
    },
    [setValue]
  );

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
      <RoomSearchInput error={errors.roomId} onSelect={onSelect} />
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
      <PhotoUploadInput
        inputProps={{
          id: 'photo',
          name: 'photo',
          type: 'file',
          accept: 'image/*',
          ...register('photo'),
        }}
        error={errors.photo}
        clear={() => setValue('photo', null)}
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
      <Markdown>{watch('body')}</Markdown>
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
