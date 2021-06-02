import { useRouter } from 'next/router';
import { indexRoomVars } from '../consts';
import { useRoomQuery } from '../generated/graphql';

const useRoomData = () => {
  const router = useRouter();

  const { data: roomData } = useRoomQuery({
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
