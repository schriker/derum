import { useMeQuery } from '../generated/graphql';
import { openModalVar } from '../lib/apolloVars';
import useOpenCloseModal from './useOpenCloseModal';

const useButtonWithAuthAndModal = () => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();

  const handleButtonClick = () => {
    if (!data) return openModalVar(true);
    handleOpen();
  };

  return {
    handleButtonClick,
    openModal,
    handleClose,
  };
};

export default useButtonWithAuthAndModal;
