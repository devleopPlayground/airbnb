import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiError } from 'next/dist/server/api-utils';

import { getMapRooms } from '@/apis/rooms';
import type { RoomType } from '@/interface';

export type GetMapRoomResponse = RoomType[];

const useGetMapRooms = () => {
  const getMapQuery = useQuery<GetMapRoomResponse, AxiosError<ApiError>>({
    queryKey: ['map-room'],
    queryFn: getMapRooms,
  });

  return { rooms: getMapQuery.data, ...getMapQuery };
};

export default useGetMapRooms;
