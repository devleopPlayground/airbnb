import { getMapRooms } from '@/apis/rooms';
import { RoomType } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';

export type GetMapRoomResponse = RoomType[];

const useGetMapRooms = () => {
  const getMapQuery = useQuery<GetMapRoomResponse, AxiosError<ApiError>>({
    queryKey: ['map-room'],
    queryFn: getMapRooms,
  });

  return { rooms: getMapQuery.data, ...getMapQuery };
};

export default useGetMapRooms;
