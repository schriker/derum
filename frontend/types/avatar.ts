export type AvatarProps = {
  src: string | null;
  name: string;
  styles?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
};
