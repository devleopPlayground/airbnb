import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type React from 'react';
import { useEffect, useRef } from 'react';

import { getMyComments } from '@/apis/comments';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const useComments = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref as React.RefObject<Element>, {
    threshold: 0,
    rootMargin: '100px',
  });
  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data: myComments,
    isLoading,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['myComments', session?.user?.id],
    queryFn: ({ pageParam }) => getMyComments({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage?.page < lastPage?.totalPage ? lastPage.page + 1 : undefined),
    enabled: status === 'authenticated',
    refetchOnWindowFocus: false,
  });

  const onNavigateRoom = (roomId: string) => {
    router.push(`/rooms/${roomId}`);
  };

  useEffect(() => {
    if (isPageEnd && hasNextPage && !isFetchingNextPage) {
      const timeout = setTimeout(() => {
        fetchNextPage();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isPageEnd, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return { ref, myComments, isLoading, isFetching, isFetchingNextPage, onNavigateRoom };
};

export default useComments;
