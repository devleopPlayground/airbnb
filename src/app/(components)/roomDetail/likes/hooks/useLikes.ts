import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import { getLikeRooms } from '@/apis/likes';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const useLikes = () => {
  const { data: session, status } = useSession();

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref as React.RefObject<Element>, {
    threshold: 0,
    rootMargin: '100px',
  });
  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data: likeRooms,
    isLoading,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['likeRooms', session?.user?.id],
    queryFn: ({ pageParam }) => getLikeRooms({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage?.page < lastPage?.totalPage ? lastPage.page + 1 : undefined),
    enabled: status === 'authenticated',
  });

  useEffect(() => {
    if (isPageEnd && hasNextPage && !isFetchingNextPage) {
      const timeout = setTimeout(() => {
        fetchNextPage();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isPageEnd, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return { likeRooms, isLoading, isFetching, isFetchingNextPage, ref };
};

export default useLikes;
