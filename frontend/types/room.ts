import { FieldError } from 'react-hook-form';

export type NewRoomProps = {
  openModal: boolean;
  handleClose: () => void;
};

export type NewRoomInputs = {
  name: string;
  description: string;
};

export type RoomSearchProps = {
  error?: FieldError;
  placeholder?: string;
  onSelect: (id: number, name?: string) => void;
};
