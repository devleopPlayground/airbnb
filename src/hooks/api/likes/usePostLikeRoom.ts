import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { postLike } from '@/apis/likes';
import type { LikeType } from '@/interface';

type PostLikeRoomResponse = {
  data: LikeType;
  status: number;
};

const usePostLikeRoom = (options?: UseMutationOptions<PostLikeRoomResponse, Error, number>) => {
  return useMutation({
    mutationFn: (roomId: number) => postLike(roomId),
    ...options,
  });
};

export default usePostLikeRoom;
