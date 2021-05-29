import { useRouter } from 'next/router';
import { indexRoomVars } from '../consts';
import { useRoomQuery } from '../generated/graphql';
import { globalErrorVar } from '../lib/apolloVars';

const useRoomData = () => {
  const router = useRouter();

  const { data: roomData } = useRoomQuery({
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
    variables: {
      name: router.query.room
        ? (router.query.room as string)
        : indexRoomVars.name,
    },
  });

  return {
    roomData,
  };
};

export default useRoomData;
