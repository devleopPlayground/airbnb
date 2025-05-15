import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { postLike } from '@/apis/likes';
import type { LikeType } from '@/interface';

interface ApiResponse {
  data: LikeType;
  status: number;
}

const usePostLikeRoom = (options?: UseMutationOptions<ApiResponse, Error, number>) => {
  return useMutation({
    mutationFn: (roomId: number) => postLike(roomId),
    ...options,
  });
};

export default usePostLikeRoom;
