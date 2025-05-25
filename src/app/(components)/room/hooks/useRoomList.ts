import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { getRooms } from '@/apis/rooms';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const useRoomList = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref as React.RefObject<Element>, {});
  const router = useRouter();

  const onNavigateMap = () => {
    router.push('/map');
  };

  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data: rooms,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useSuspenseInfiniteQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined),
  });

  if (isError) {
    throw new Error('Room API Fetching Error.');
  }

  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      const timeout = setTimeout(() => {
        fetchNextPage();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isPageEnd, hasNextPage, fetchNextPage]);

  return { rooms, isFetching, isLoading, hasNextPage, isFetchingNextPage, ref, onNavigateMap };
};

export default useRoomList;
