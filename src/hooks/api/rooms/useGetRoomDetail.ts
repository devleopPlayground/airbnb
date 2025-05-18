import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiError } from 'next/dist/server/api-utils';

import { getRoomsDetail } from '@/apis/rooms';
import type { RoomType } from '@/interface';

export type GetRoomDetailResponse = RoomType;

export const dynamic = 'force-static';
export const revalidate = 60 * 60;

const useGetRoomDetail = (id: string) => {
  const getRoomDetailQuery = useQuery<GetRoomDetailResponse, AxiosError<ApiError>>({
    queryKey: ['room-detail', id],
    queryFn: () => getRoomsDetail(id),
    enabled: !!id,
  });

  return { roomDetail: getRoomDetailQuery.data, ...getRoomDetailQuery };
};

export default useGetRoomDetail;
