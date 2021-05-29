export type AvatarProps = {
  src: string | null;
  name: string;
  color: string;
  styles?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};
