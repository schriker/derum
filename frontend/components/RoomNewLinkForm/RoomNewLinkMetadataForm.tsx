import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  CheckLinkExsitsQuery,
  useCheckLinkExsitsLazyQuery,
} from '../../generated/graphql';
import {
  NewLinkMetadataInputs,
  NewLinkMetadataProps,
} from '../../types/newLink';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import RoomNewLinkExist from '../RoomNewLinkExist/RoomNewLinkExist';
import RoomNewLinkPreview from '../RoomNewLinkPreview/RoomNewLinkPreview';
import RoomSearchInput from '../RoomSearchInput/RoomSearchInput';
import useNewRoomLinkStyles from './RoomNewLinkFormStyles';

const schema = yup.object().shape({
  roomId: yup.number().required('Wybierz pokój.'),
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
  closeModal,
}: NewLinkMetadataProps) => {
  const classes = useNewRoomLinkStyles();
  const [exists, setExsists] = useState<
    CheckLinkExsitsQuery['checkLinkExsits']
  >([]);
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

  const [checkIfExists, { loading: checkLoading }] =
    useCheckLinkExsitsLazyQuery({
      onCompleted: (data) => {
        if (!data.checkLinkExsits.length) return setExsists([]);

        setExsists(data.checkLinkExsits);
      },
    });

  useEffect(() => {
    if (watch('roomId')) {
      checkIfExists({
        variables: {
          roomId: watch('roomId'),
          linkId: metadata.id,
        },
      });
    }
  }, [watch('roomId')]);

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
      {!!exists.length && (
        <RoomNewLinkExist closeModal={closeModal} data={exists} />
      )}
      <RoomNewLinkPreview
        metadata={{
          ...metadata,
          title: watch('title'),
          description: watch('description'),
          photo: watch('photo'),
        }}
      />
      <Box display="flex" justifyContent="flex-end">
        <ButtonPrimary
          onClick={() => setLinkMetadata(null)}
          className={classes.submitButton}
          color="default"
        >
          Wstecz
        </ButtonPrimary>
        <ButtonPrimary
          disabled={checkLoading || !!exists.length}
          className={classes.submitButton}
          color="primary"
          type="submit"
        >
          Dodaj link
        </ButtonPrimary>
      </Box>
    </form>
  );
};

export default RoomNewLinkMetadataForm;
