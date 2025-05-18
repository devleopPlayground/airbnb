import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiError } from 'next/dist/server/api-utils';

import { getComments } from '@/apis/comments';
import type { CommentResponseApiType } from '@/interface';

export type GetCommentsResponse = CommentResponseApiType;

const useGetComments = (roomId: number) => {
  const getRoomComments = useQuery<GetCommentsResponse, AxiosError<ApiError>>({
    queryKey: ['room-comments', roomId],
    queryFn: () => getComments(roomId),
    enabled: !!roomId, // roomId가 없으면 쿼리를 실행하지 않음
  });

  return { roomComments: getRoomComments.data, ...getRoomComments };
};

export default useGetComments;
