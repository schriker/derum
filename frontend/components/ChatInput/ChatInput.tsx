import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import * as yup from 'yup';
import {
  GlobalEmojisQuery,
  useCreateMessageMutation,
  useGlobalEmojisQuery,
  useMeQuery,
  useOnlineUsersQuery,
} from '../../generated/graphql';
import findStringStartEndIndex from '../../helpers/stringStartEndIndex';
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
  const { data: emojis } = useGlobalEmojisQuery();
  const { data: onlineUsers } = useOnlineUsersQuery({
    variables: {
      roomId,
    },
  });
  const [caretPositoon, setCaretPosition] = useState(0);
  const [matchedKeyWords, setMatchedKeyWords] = useState<
    GlobalEmojisQuery['globalEmojis'] | string[]
  >([]);
  const bodyFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const [matchIndex, setMatchIndex] = useState<null | number>(null);
  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<ChatInputs>({
      resolver: yupResolver(schema),
    });

  const { data, loading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const connecting = !isConnected && !loading;

  const [sendNewMessage] = useCreateMessageMutation({
    onCompleted: () => {
      reset({ body: '' });
      stateCleanUp();
    },
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
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

  const stateCleanUp = () => {
    debouncedSetEmojis.flush();
    debouncedSetUsers.flush();
    setMatchedKeyWords([]);
    setMatchIndex(null);
  };

  const debouncedSetUsers = useDebouncedCallback((word: string) => {
    if (getValues('body').length) {
      console.log(onlineUsers);
      const matchedUsers = onlineUsers?.onlineUsers.map((user) => {
        if (user.name.startsWith(word.split('@')[1])) return `@${user.name}`;
      });
      setMatchedKeyWords(matchedUsers.filter((item) => item !== undefined));
    }
  }, 1000);

  const debouncedSetEmojis = useDebouncedCallback((word: string) => {
    if (getValues('body').length) {
      setMatchedKeyWords(
        emojis?.globalEmojis.filter((emoji) =>
          emoji.name.toLowerCase().includes(word.toLowerCase())
        )
      );
    }
  }, 1000);

  const putEmoji = (emoji: string, atEnd = false) => {
    let text = getValues('body');
    const { begin, end } = findStringStartEndIndex(
      text,
      bodyFieldRef.current.selectionStart
    );
    const startPosition = atEnd ? end : begin;
    text =
      text.substring(0, startPosition) +
      `${emoji} ` +
      text.substring(end, text.length);
    setCaretPosition(startPosition + emoji.length + 1);
    setValue('body', text);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Tab') {
      stateCleanUp();
      const text = getValues('body');
      const { begin, end } = findStringStartEndIndex(
        text,
        bodyFieldRef.current.selectionStart
      );
      const word = text.substring(begin, end);
      if (word.length > 2) {
        if (word.match(/^@\w*/)) {
          if (word.length > 3) {
            debouncedSetUsers(word.trim());
          }
        } else {
          debouncedSetEmojis(word.trim());
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      debouncedSetEmojis.flush();
      debouncedSetUsers.flush();
      if (matchedKeyWords.length > 0) {
        if (matchIndex >= matchedKeyWords.length - 1 || matchIndex === null) {
          setMatchIndex(0);
          putEmoji(
            typeof matchedKeyWords[0] === 'string'
              ? matchedKeyWords[0]
              : matchedKeyWords[0].name
          );
        } else {
          setMatchIndex((index) => index + 1);
          putEmoji(
            typeof matchedKeyWords[matchIndex + 1] === 'string'
              ? matchedKeyWords[matchIndex + 1]
              : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                matchedKeyWords[matchIndex + 1].name
          );
        }
      }
    }
  };

  useEffect(() => {
    bodyFieldRef.current.setSelectionRange(caretPositoon, caretPositoon);
  }, [caretPositoon]);

  const handleQuickEmojiSelect = (name: string, index: number) => {
    putEmoji(name);
    setMatchIndex(index);
    handleSetInputFocus();
  };

  const handleSetInputFocus = () => {
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
          <ButtonIcon color="primary" type="submit">
            <SendIcon style={{ fontSize: 16 }} />
          </ButtonIcon>
        </Box>
      </Box>
    </form>
  );
};

export default ChatInput;
