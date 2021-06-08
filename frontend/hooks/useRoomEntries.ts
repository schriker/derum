import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PAGE_LIMIT } from '../consts';
import { useEntriesQuery, EntrySort, EntriesQuery } from '../generated/graphql';
import { globalErrorVar } from '../lib/apolloVars';

const useRoomEntries = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const vars = {
    roomName: router.query.room as string,
    limit: PAGE_LIMIT,
  };
  const {
    data: entriesData,
    fetchMore,
    networkStatus,
    refetch,
  } = useEntriesQuery({
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera.' }),
    notifyOnNetworkStatusChange: true,
    variables: {
      queryData: {
        ...vars,
        offset: 0,
        sort: router.query.sort
          ? EntrySort[router.query.sort[0].toUpperCase()]
          : EntrySort.NEW,
      },
    },
  });

  useEffect(() => {
    if (isMounted) {
      setHasMore(true);
      setIsInView(false);
      refetch();
    }
    setIsMounted(true);
  }, [router.query.sort]);

  useEffect(() => {
    setHasMore(true);
    setIsInView(false);
    () => {
      setHasMore(false);
      setIsInView(true);
    };
  }, [router.query.room]);

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  useEffect(() => {
    const fetchMoreData = async () => {
      if (isInView && hasMore) {
        const cursor = entriesData.entries.length
          ? entriesData.entries[entriesData.entries.length - 1].id
          : 0;
        const offset = !router.query.sort ? cursor : entriesData.entries.length;

        const { data }: { data: EntriesQuery } = await fetchMore({
          variables: {
            queryData: {
              ...vars,
              sort: router.query.sort
                ? EntrySort[router.query.sort[0].toUpperCase()]
                : EntrySort.NEW,
              offset: offset,
            },
          },
        });
        if (!data.entries.length) setHasMore(false);
      }
    };

    fetchMoreData();
  }, [isInView, hasMore]);

  return {
    hasMore,
    networkStatus,
    entriesData,
    ref,
  };
};

export default useRoomEntries;
