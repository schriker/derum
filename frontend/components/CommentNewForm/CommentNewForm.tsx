import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  CommentFragmentFragmentDoc,
  useCreateCommentMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { NewCommentInputs, NewCommentPropsType } from '../../types/comment';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { CustomInput } from '../CustomInput/CustomInput';
import FormInput from '../FormInput/FormInput';
import Markdown from '../Markdown/Markdown';
import useRoomNewLinkStyles from '../RoomNewLinkForm/RoomNewLinkFormStyles';

const schema = yup.object().shape({
  body: yup.string().trim().required('Treść jest wymagana.'),
});

const CommentNewForm = ({ entryId, parentId }: NewCommentPropsType) => {
  const classes = useRoomNewLinkStyles();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewCommentInputs>({
    resolver: yupResolver(schema),
  });

  const [createComment, { loading }] = useCreateCommentMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    onCompleted: () =>
      reset({
        body: '',
      }),
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          comments(existingComments) {
            const newCommentRef = cache.writeFragment({
              data: data.createComment,
              fragment: CommentFragmentFragmentDoc,
              fragmentName: 'CommentFragment',
            });
            return [newCommentRef, ...existingComments];
          },
        },
      });
    },
  });

  const onSubmit: SubmitHandler<NewCommentInputs> = (variables) => {
    createComment({
      variables: {
        commentData: {
          entryId,
          body: variables.body,
          parentId: parentId || null,
        },
      },
    });
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="body"
          label="Komentarz"
          control={control}
          error={errors.body}
          inputRender={(field, id) => (
            <CustomInput
              bg="light"
              error={!!errors.body}
              inputProps={{ id: id }}
              multiline
              rows={2}
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
            Dodaj komentarz
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
};

export default CommentNewForm;
