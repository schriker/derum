export interface ModalProps {
  title?: string;
  close: () => void;
  exited?: () => void;
  children: React.ReactNode;
}
