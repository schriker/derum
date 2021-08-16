import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateMessageMutation, useMeQuery } from '../../generated/graphql';
import useInputQuickSelect from '../../hooks/useInputQuickSelect';
import useIsConnected from '../../hooks/useIsConnected';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { ChatInputs } from '../../types/chatInputs';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import ChatInputQuickBar from '../ChatInputQuickBar/ChatInputQuickBar';
import { CustomInput } from '../CustomInput/CustomInput';
import Emojis from '../Emojis/Emojis';
import SendIcon from '../Icons/SendIcon';

const schema = yup.object().shape({
  body: yup.string().trim().required(),
});

const ChatInput = ({ roomId }: { roomId: number }) => {
  const isConnected = useIsConnected();
  const bodyFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<ChatInputs>({
      resolver: yupResolver(schema),
    });

  const { data, loading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const onSubmit: SubmitHandler<ChatInputs> = (inputData) => {
    if (!data) return openModalVar(true);
    sendNewMessage({
      variables: {
        body: inputData.body,
        roomId: roomId,
      },
    });
  };

  const {
    stateCleanUp,
    caretPositoon,
    handleKeyDown,
    handleKeyUp,
    matchIndex,
    matchedKeyWords,
    putEmoji,
    setMatchIndex,
  } = useInputQuickSelect({
    roomId,
    getValues,
    setValue,
    onSubmit,
    handleSubmit,
    bodyFieldRef,
  });

  const connecting = !isConnected && !loading;

  const [sendNewMessage] = useCreateMessageMutation({
    onCompleted: () => {
      reset({ body: '' });
      stateCleanUp();
    },
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  useEffect(() => {
    bodyFieldRef.current.setSelectionRange(caretPositoon, caretPositoon);
  }, [caretPositoon]);

  const handleQuickEmojiSelect = (name: string, index: number) => {
    putEmoji(name);
    setMatchIndex(index);
    handleSetInputFocus();
  };

  const handleSetInputFocus = () => {
    bodyFieldRef.current.setSelectionRange(
      getValues('body').length,
      getValues('body').length
    );
    bodyFieldRef.current.focus();
  };

  const handleEmojiSelect = (name: string) => {
    putEmoji(name, true);
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
        <Box flex="1 1 auto">
          {!!matchedKeyWords?.length && (
            <ChatInputQuickBar
              handleClick={handleQuickEmojiSelect}
              matchIndex={matchIndex}
              keyWords={matchedKeyWords}
            />
          )}
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
                onKeyUp={handleKeyUp}
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
          <ButtonIcon aria-label="Submit" color="primary" type="submit">
            <SendIcon style={{ fontSize: 16 }} />
          </ButtonIcon>
        </Box>
      </Box>
    </form>
  );
};

export default ChatInput;
