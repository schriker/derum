import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { globalErrorVar } from '../lib/apolloVars';
import { QueryType, ReturnDataType, ReturnType } from '../types/userProfile';

function useInfiniteScrollFetchUserProfileData<T extends QueryType>(
  query: T
): ReturnType<T> {
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchMore } = query({
    fetchPolicy: 'network-only',
    onError: () =>
      globalErrorVar({ isOpen: true, message: 'Nie mogliśmy pobrać wpisów.' }),
    variables: {
      offsetId: 0,
      userId: parseInt(router.query.id as string),
    },
  });

  useEffect(() => {
    const fetchMoreData = async () => {
      if (inView && hasMore) {
        const [key] = Object.keys(data);
        const offsetId = data[key].length
          ? data[key][data[key].length - 1].id
          : 0;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { data: resultData } = await fetchMore({
          variables: {
            offsetId: offsetId,
            userId: parseInt(router.query.id as string),
          },
        });

        if (!resultData[key].length) setHasMore(false);
      }
    };

    fetchMoreData();
  }, [inView, hasMore, data, fetchMore, router.query.id]);

  return {
    ref,
    hasMore,
    data: data as ReturnDataType<T>,
  };
}

export default useInfiniteScrollFetchUserProfileData;
