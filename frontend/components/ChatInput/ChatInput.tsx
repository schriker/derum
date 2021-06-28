import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import * as yup from 'yup';
import {
  GlobalEmojisQuery,
  useCreateMessageMutation,
  useGlobalEmojisQuery,
  useMeQuery,
} from '../../generated/graphql';
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

const ChatInput = ({ roomId }: { roomId: number }): JSX.Element => {
  const isConnected = useIsConnected();
  const [matchIndex, setMatchIndex] = useState(null);
  const [matchedEmojis, setMatchedEmojis] = useState<
    GlobalEmojisQuery['globalEmojis']
  >([]);
  const { data: emojis } = useGlobalEmojisQuery();
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

  const debouncedSetEmojis = useDebouncedCallback((word: string) => {
    setMatchedEmojis(
      emojis?.globalEmojis.filter((emoji) =>
        emoji.name.toLowerCase().includes(word.toLowerCase())
      )
    );
  }, 1000);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Tab') {
      const word = getValues('body').split(' ').pop();
      if (word.length > 1) {
        debouncedSetEmojis(word);
      } else {
        setMatchedEmojis([]);
        setMatchIndex(null);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
    if (event.key === 'Tab') {
      debouncedSetEmojis.flush();
      event.preventDefault();
      if (matchedEmojis.length > 0) {
        const words = getValues('body').trim().split(' ');
        if (matchIndex >= matchedEmojis.length - 1 || matchIndex === null) {
          setMatchIndex(0);
          words[words.length - 1] = `${matchedEmojis[0].name} `;
        } else {
          setMatchIndex((index) => index + 1);
          words[words.length - 1] = `${matchedEmojis[matchIndex + 1].name} `;
        }
        setValue('body', words.join(' '));
      }
    }
  };

  const handleQuickEmojiSelect = (name: string) => {
    const words = getValues('body').trim().split(' ');
    words[words.length - 1] = `${name} `;
    setValue('body', words.join(' '));
    handleSetInputFocus();
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
          {!!matchedEmojis.length && (
            <ChatInputQuickBar
              handleClick={handleQuickEmojiSelect}
              matchIndex={matchIndex}
              emojis={matchedEmojis}
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
          <ButtonIcon color="primary" type="submit">
            <SendIcon style={{ fontSize: 16 }} />
          </ButtonIcon>
        </Box>
      </Box>
    </form>
  );
};

export default ChatInput;
