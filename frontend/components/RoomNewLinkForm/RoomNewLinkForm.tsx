import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NewLinkInputs, NewLinkProps } from '../../types/newLink';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import Modal from '../Modal/Modal';
import useNewRoomLinkStyles from './RoomNewLinkFormStyles';

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

const RoomNewLinkForm = ({ openModal, handleClose }: NewLinkProps) => {
  const classes = useNewRoomLinkStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLinkInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewLinkInputs> = (variables) => {
    console.log(variables);
  };

  return (
    <Modal
      fullWidth
      maxWidth="sm"
      title="Nowy link"
      open={openModal}
      close={handleClose}
    >
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
          // disabled={loading}
          className={classes.submitButton}
          color="primary"
          type="submit"
        >
          Dodaj link
        </ButtonPrimary>
      </form>
    </Modal>
  );
};

export default RoomNewLinkForm;
