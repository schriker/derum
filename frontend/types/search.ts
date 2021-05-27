import { ChangeEvent } from 'react';

export type SearchInputProps = {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
