import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { indexRoomVars, PAGE_LIMIT } from '../consts';
import {
  useEntriesQuery,
  EntrySort,
  EntriesQuery,
  useMeQuery,
} from '../generated/graphql';
import { globalErrorVar } from '../lib/apolloVars';

const useRoomEntries = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const sort = router.query.sort
    ? EntrySort[router.query.sort[0].toUpperCase()]
    : EntrySort.NEW;
  const vars = {
    roomName: router.query.room
      ? (router.query.room as string)
      : indexRoomVars.name,
    limit: PAGE_LIMIT,
    sort: sort ? sort : EntrySort.NEW,
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
  }, [data]);

  useEffect(() => {
    setHasMore(true);
    setIsInView(false);
    refetch();
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
    isMounted,
    refetch,
    ref,
  };
};

export default useRoomEntries;
