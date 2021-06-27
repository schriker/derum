import { GlobalEmojisQuery } from '../generated/graphql';

export type EmojisPickerPropsType = {
  isOpen: boolean;
  onSelect: (name: string) => void;
  handleClose: () => void;
  setInpuFocus: () => void;
  anchorEl: Element | ((element: Element) => Element);
};

export type EmojisPickerEmojiPropsType = {
  handleHover: (index: number) => void;
  handleClick: (name: string) => void;
  emoji: GlobalEmojisQuery['globalEmojis'][0];
  index: number;
  hoveredEmoji: number;
};

export type EojisPicerPreviewPropsType = {
  emoji: GlobalEmojisQuery['globalEmojis'][0];
};

export type EmojisPropsType = {
  onSelect: (name: string) => void;
  setInpuFocus: () => void;
};
