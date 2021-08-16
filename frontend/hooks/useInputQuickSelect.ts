import { useState } from 'react';
import {
  GlobalEmojisQuery,
  useGlobalEmojisQuery,
  useOnlineUsersQuery,
} from '../generated/graphql';
import { useDebouncedCallback } from 'use-debounce';
import {
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import { ChatInputs } from '../types/chatInputs';
import findStringStartEndIndex from '../helpers/stringStartEndIndex';

type UseInputQuickSelectPropsType = {
  roomId: number;
  getValues: UseFormGetValues<ChatInputs>;
  setValue: UseFormSetValue<ChatInputs>;
  onSubmit: SubmitHandler<ChatInputs>;
  handleSubmit: UseFormHandleSubmit<ChatInputs>;
  bodyFieldRef: React.MutableRefObject<HTMLTextAreaElement>;
};

const useInputQuickSelect = ({
  roomId,
  getValues,
  setValue,
  handleSubmit,
  onSubmit,
  bodyFieldRef,
}: UseInputQuickSelectPropsType) => {
  const [caretPositoon, setCaretPosition] = useState(0);
  const [matchIndex, setMatchIndex] = useState<null | number>(null);
  const [matchedKeyWords, setMatchedKeyWords] = useState<
    GlobalEmojisQuery['globalEmojis'] | string[]
  >([]);
  const { data: emojis } = useGlobalEmojisQuery();
  const { data: onlineUsers } = useOnlineUsersQuery({
    variables: {
      roomId,
    },
  });

  const stateCleanUp = () => {
    debouncedSetEmojis.flush();
    debouncedSetUsers.flush();
    setMatchedKeyWords([]);
    setMatchIndex(null);
  };

  const debouncedSetUsers = useDebouncedCallback((word: string) => {
    if (getValues('body').length) {
      const matchedUsers = onlineUsers?.onlineUsers.map((user) => {
        if (user.name.startsWith(word.split('@')[1])) return `@${user.name}`;
      });
      setMatchedKeyWords(matchedUsers.filter((item) => item !== undefined));
    }
  }, 300);

  const debouncedSetEmojis = useDebouncedCallback((word: string) => {
    if (getValues('body').length) {
      setMatchedKeyWords(
        emojis?.globalEmojis.filter((emoji) =>
          emoji.name.toLowerCase().includes(word.toLowerCase())
        )
      );
    }
  }, 300);

  const putEmoji = (emoji: string, atEnd = false) => {
    let text = getValues('body');
    const { begin, end } = findStringStartEndIndex(
      text,
      bodyFieldRef.current.selectionStart
    );
    const startPosition = atEnd ? end : begin;
    text =
      text.substring(0, startPosition).trim() +
      ` ${emoji} ` +
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
      if (word.length > 1) {
        if (word.match(/^@\w*/)) {
          debouncedSetUsers(word.trim());
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
          const keyWord = matchedKeyWords[0];
          putEmoji(typeof keyWord === 'string' ? keyWord : keyWord.name);
        } else {
          setMatchIndex((index) => index + 1);
          const keyWord = matchedKeyWords[matchIndex + 1];
          putEmoji(typeof keyWord === 'string' ? keyWord : keyWord.name);
        }
      }
    }
  };

  return {
    handleKeyDown,
    handleKeyUp,
    putEmoji,
    caretPositoon,
    stateCleanUp,
    matchedKeyWords,
    matchIndex,
    setMatchIndex,
  };
};

export default useInputQuickSelect;
