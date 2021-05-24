import { Box, InputAdornment } from '@material-ui/core';
import React from 'react';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { useCreateMessageMutation, useMeQuery } from '../../generated/graphql';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import { CustomInput } from '../CustomInput/CustomInput';
import EmoticonsIcon from '../Icons/EmoticonsIcon';
import SendIcon from '../Icons/SendIcon';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ChatInputs } from '../../types/chatInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useIsConnected from '../../hooks/useIsConnected';

const schema = yup.object().shape({
  body: yup.string().trim().required(),
});

const ChatInput = ({ roomId }: { roomId: number }) => {
  const isConnected = useIsConnected();
  const { control, handleSubmit, reset } = useForm<ChatInputs>({
    resolver: yupResolver(schema),
  });
  const { data, loading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [sendNewMessage] = useCreateMessageMutation({
    onCompleted: () => reset({ body: '' }),
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
  });

  const connecting = !isConnected && !loading;

  const onSubmit: SubmitHandler<ChatInputs> = (inputData) => {
    if (!data) {
      openModalVar(true);
    } else {
      sendNewMessage({
        variables: {
          body: inputData.body,
          roomId: roomId,
        },
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.which === 13) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box minHeight={70} py={2} display="flex" flex="1 0 auto">
        <Box flex="1 0 auto">
          <Controller
            name="body"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInput
                inputProps={{ maxLength: 500 }}
                multiline
                disabled={connecting}
                rowsMax={20}
                placeholder={!connecting ? 'Wiadomość' : 'Łącze z serwerem...'}
                endAdornment={
                  <InputAdornment position="end">
                    <ButtonIcon color="secondary" size="small">
                      <EmoticonsIcon style={{ fontSize: 24 }} />
                    </ButtonIcon>
                  </InputAdornment>
                }
                {...field}
                onKeyDown={handleKeyDown}
              />
            )}
          />
        </Box>
        <Box mx={1}>
          <ButtonIcon color="primary" type="submit">
            <SendIcon style={{ fontSize: 16 }} />
          </ButtonIcon>
        </Box>
      </Box>
    </form>
  );
};

export default ChatInput;
