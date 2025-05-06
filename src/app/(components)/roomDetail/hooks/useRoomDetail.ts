import useGetRoomDetail from '@/hooks/api/rooms/useGetRoomDetail';

const useRoomDetail = (id: string) => {
  const { roomDetail } = useGetRoomDetail(id);

  return { roomDetail };
};

export default useRoomDetail;
