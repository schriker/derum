import { GlobalEmojisQuery } from '../generated/graphql';

export type ChatInputs = {
  body: string;
};

export type ChatInputQuickBarPropsType = {
  keyWords: GlobalEmojisQuery['globalEmojis'] | string[];
  matchIndex: number;
  handleClick: (name: string, index: number) => void;
};

export type ChatInputQuickBarUserPropsType = {
  value: string;
  index: number;
  active: number;
  handleClick: (name: string, index: number) => void;
};
