import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import usePostLikeRoom from '@/hooks/api/likes/usePostLikeRoom';

const useLikeButton = (roomId: number) => {
  const session = useSession();
  const queryClient = useQueryClient();

  const { mutate: postLike } = usePostLikeRoom({
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success('좋아요에 성공했습니다.');
      } else {
        toast.error('좋아요를 취소했습니다.');
      }

      queryClient.invalidateQueries({ queryKey: ['room-detail', String(roomId)] });
    },
  });

  const onClickToggleLike = () => {
    if (session?.data?.user) {
      postLike(roomId);
    }
  };

  return { onClickToggleLike };
};

export default useLikeButton;
