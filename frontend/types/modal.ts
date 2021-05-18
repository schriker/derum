export interface ModalProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}
