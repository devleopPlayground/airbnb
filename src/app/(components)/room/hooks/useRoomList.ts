import { getRooms } from '@/apis/rooms';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const useRoomList = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref as React.RefObject<Element>, {});

  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data: rooms,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
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
      setTimeout(() => {
        fetchNextPage();
      }, 500);
    }
  }, [isPageEnd, hasNextPage, fetchNextPage]);

  return { rooms, isFetching, hasNextPage, isFetchingNextPage, isLoading, ref };
};

export default useRoomList;
