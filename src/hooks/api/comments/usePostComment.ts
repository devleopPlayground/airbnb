import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { postComment } from '@/apis/comments';

export type PostCommentResponse = {
  roomId: number;
  body: string;
};

const usePostComment = (options?: UseMutationOptions<unknown, Error, PostCommentResponse>) => {
  // 성공시 받을 데이터 타입, 에러 타입, 요청보낼 값들의 타입
  return useMutation({
    mutationFn: ({ roomId, body }) => postComment(roomId, body),
    ...options,
  });
};

export default usePostComment;
