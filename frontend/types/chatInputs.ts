import { GlobalEmojisQuery } from '../generated/graphql';

export type ChatInputs = {
  body: string;
};

export type ChatInputQuickBarPropsType = {
  emojis: GlobalEmojisQuery['globalEmojis'];
  matchIndex: number;
  handleClick: (name) => void;
};
