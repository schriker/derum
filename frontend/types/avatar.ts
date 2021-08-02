import { PhotoFragmentFragment } from '../generated/graphql';

export type AvatarProps = {
  src: string | null;
  name: string;
  color: string;
  styles?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};

export type AvatarUploadInputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (id: number) => void;
  name: string;
  loading: boolean;
  photo: PhotoFragmentFragment;
};
