import { useRouter } from 'next/router';
import { useUserProfileQuery } from '../generated/graphql';

const useUserProfileData = () => {
  const router = useRouter();
  const { data } = useUserProfileQuery({
    variables: {
      id: parseInt(router.query.id as string),
    },
  });
  return {
    data,
  };
};

export default useUserProfileData;
