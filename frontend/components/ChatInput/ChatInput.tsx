import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateMessageMutation, useMeQuery } from '../../generated/graphql';
import useIsConnected from '../../hooks/useIsConnected';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { ChatInputs } from '../../types/chatInputs';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import { CustomInput } from '../CustomInput/CustomInput';
import Emojis from '../Emojis/Emojis';
import SendIcon from '../Icons/SendIcon';

const schema = yup.object().shape({
  body: yup.string().trim().required(),
});

const ChatInput = ({ roomId }: { roomId: number }): JSX.Element => {
  const isConnected = useIsConnected();
  const bodyFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<ChatInputs>({
      resolver: yupResolver(schema),
    });
  const { data, loading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [sendNewMessage] = useCreateMessageMutation({
    onCompleted: () => reset({ body: '' }),
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  const connecting = !isConnected && !loading;

  const onSubmit: SubmitHandler<ChatInputs> = (inputData) => {
    if (!data) return openModalVar(true);

    sendNewMessage({
      variables: {
        body: inputData.body,
        roomId: roomId,
      },
    });
  };

  const handleKeyDown = (event) => {
    if (event.which === 13) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleSetInputFocus = () => {
    bodyFieldRef.current.focus();
  };

  const handleEmojiSelect = (name: string) => {
    setValue('body', getValues('body') + ` ${name} `);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        minHeight={70}
        py={2}
        display="flex"
        flex="1 0 auto"
        alignItems="flex-end"
      >
        <Box flex="1 0 auto">
          <Controller
            name="body"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInput
                bg="dark"
                inputProps={{ maxLength: 500 }}
                multiline
                disabled={connecting}
                rowsMax={20}
                placeholder={!connecting ? 'Wiadomość' : 'Łącze z serwerem...'}
                endAdornment={
                  <Emojis
                    setInpuFocus={handleSetInputFocus}
                    onSelect={handleEmojiSelect}
                  />
                }
                {...field}
                onKeyDown={handleKeyDown}
                inputRef={(e) => {
                  field.ref(e);
                  bodyFieldRef.current = e;
                }}
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
