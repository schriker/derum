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
  error: FieldError;
  onSelect: (id: number) => void;
};
