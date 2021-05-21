export interface ModalProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  exited?: () => void;
  children: React.ReactNode;
}
