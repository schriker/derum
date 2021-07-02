import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  RoomFragmentFragmentDoc,
  useCreateRoomMutation,
  useMeQuery,
} from '../../generated/graphql';
import { globalErrorVar, openDrawerVar } from '../../lib/apolloVars';
import { NewRoomInputs, NewRoomProps } from '../../types/room';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import Modal from '../Modal/Modal';
import useNewRoomStyles from './NewRoomStyles';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Nazwa jest wymagana.')
    .min(3, 'Nazwa min. 3 znaki.')
    .max(35, 'Zbyt długa nazwa.')
    .matches(/^[a-zA-Z0-9_]+$/, 'Tylko znaki alfarnumerczyne oraz "_"'),
  description: yup
    .string()
    .trim()
    .required('Opis jest wymagany.')
    .min(10, 'Opis min. 10 znaków.')
    .max(255, 'Zbyt długi opis.'),
});

const NewRoomForm = ({ openModal, handleClose }: NewRoomProps) => {
  const router = useRouter();
  const classes = useNewRoomStyles();
  const { data: me } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [createRoom, { loading }] = useCreateRoomMutation({
    onCompleted: ({ createRoom }) => {
      handleClose();
      openDrawerVar(false);
      router.push(`/p/${createRoom.name}`);
    },
    onError: (error) =>
      globalErrorVar({ isOpen: true, message: error.message }),
    update: (cache, { data: { createRoom } }) => {
      cache.modify({
        id: cache.identify(me.me),
        fields: {
          joinedRooms(prev) {
            const newRoomRef = cache.writeFragment({
              data: createRoom,
              fragment: RoomFragmentFragmentDoc,
              fragmentName: 'RoomFragment',
            });
            return [...prev, newRoomRef];
          },
        },
      });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRoomInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewRoomInputs> = (variables) => {
    createRoom({
      variables,
    });
  };

  return (
    <Modal
      fullWidth
      maxWidth="sm"
      title="Nowy pokój"
      open={openModal}
      close={handleClose}
    >
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
              inputProps={{ maxLength: 255, id: id }}
              placeholder="Nazwa"
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
              inputProps={{ maxLength: 255, id: id }}
              multiline
              rows={3}
              rowsMax={20}
              placeholder="Opis"
              {...field}
            />
          )}
        />
        <Box display="flex" justifyContent="flex-end">
          <ButtonPrimary
            disabled={loading}
            className={classes.submitButton}
            type="submit"
          >
            Utwórz
          </ButtonPrimary>
        </Box>
      </form>
    </Modal>
  );
};

export default NewRoomForm;
