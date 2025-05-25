import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { getCommentsPagination } from '@/apis/comments';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const useCommentModalContent = (roomId?: string) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref as React.RefObject<Element>, {
    rootMargin: '30%',
  });

  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data: comments,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['room-comments', Number(roomId)],
    queryFn: ({ pageParam }) => getCommentsPagination(Number(roomId), pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPage ? lastPage.page + 1 : undefined),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isPageEnd && hasNextPage) {
      const timeout = setTimeout(() => {
        fetchNextPage();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isPageEnd, hasNextPage, fetchNextPage]);

  return { ref, comments, isFetching, isFetchingNextPage, isLoading };
};

export default useCommentModalContent;
