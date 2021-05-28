import React, { ChangeEvent } from 'react';

export type SearchInputProps = {
  value: string;
  placeholder: string;
  style?: React.CSSProperties;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
