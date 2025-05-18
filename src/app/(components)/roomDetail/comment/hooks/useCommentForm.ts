import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import usePostComment from '@/hooks/api/comments/usePostComment';

const useCommentForm = (roomId: number) => {
  const session = useSession();
  const queryClient = useQueryClient();

  const { mutate: postComment } = usePostComment({
    onSuccess: () => {
      toast.success('댓글이 작성되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['room-comments', roomId] });
    },
    onError: () => {
      toast.error('댓글 작성에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const comment = formData.get('comment') as string;

    if (!comment) {
      toast.error('댓글을 입력해주세요.');

      return;
    }

    e.currentTarget.reset();

    postComment({ roomId, body: comment });
  };

  return { session, handleSubmit };
};

export default useCommentForm;
