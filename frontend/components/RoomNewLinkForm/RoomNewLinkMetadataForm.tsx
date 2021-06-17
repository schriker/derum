import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  CheckLinkExsitsQuery,
  useCheckLinkExsitsLazyQuery,
  useCreateLinkMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import {
  NewLinkMetadataInputs,
  NewLinkMetadataProps,
} from '../../types/newLink';
import { ButtonDefault } from '../Buttons/ButtonDefault';
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
    .min(10, 'Tytuł min. 10 znaków.')
    .max(150, 'Zbyt długi tytuł.'),
  description: yup
    .string()
    .trim()
    .required('Opis jest wymagany.')
    .min(50, 'Opis min. 50 znaków.')
    .max(350, 'Zbyt długi opis.'),
});

const RoomNewLinkMetadataForm = ({
  metadata,
  setLinkMetadata,
  closeModal,
}: NewLinkMetadataProps) => {
  const classes = useNewRoomLinkStyles();
  const router = useRouter();
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

  const roomId = watch('roomId');

  useEffect(() => {
    if (watch('roomId')) {
      checkIfExists({
        variables: {
          roomId: watch('roomId'),
          linkId: metadata.id,
        },
      });
    }
  }, [roomId, watch, checkIfExists, metadata.id]);

  const [createLink, { loading: createLinkLoading }] = useCreateLinkMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    onCompleted: (data) => {
      closeModal();
      router.push(
        `/p/${data.createLink.room.name}/wpis/${data.createLink.id}/${data.createLink.slug}`
      );
    },
  });

  const onSubmit: SubmitHandler<NewLinkMetadataInputs> = (variables) => {
    const { description, title, roomId } = variables;
    createLink({
      variables: {
        newLinkData: {
          description,
          title,
          roomId,
          linkId: metadata.id,
        },
      },
    });
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
        name="description"
        label="Opis"
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
      {!!exists.length && (
        <RoomNewLinkExist closeModal={closeModal} data={exists} />
      )}
      <RoomNewLinkPreview
        metadata={{
          ...metadata,
          title: watch('title'),
          description: watch('description'),
        }}
      />
      <Box display="flex" justifyContent="flex-end">
        <ButtonDefault
          onClick={() => setLinkMetadata(null)}
          className={classes.submitButton}
          disabled={createLinkLoading}
        >
          Wstecz
        </ButtonDefault>
        <ButtonPrimary
          disabled={checkLoading || createLinkLoading || !!exists.length}
          className={classes.submitButton}
          type="submit"
        >
          Dodaj link
        </ButtonPrimary>
      </Box>
    </form>
  );
};

export default RoomNewLinkMetadataForm;
