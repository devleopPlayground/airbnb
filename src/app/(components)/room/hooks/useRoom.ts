import { getRooms } from '@/apis/rooms';
import { RoomType } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const useRoom = () => {
  return useQuery<RoomType[], Error>({
    queryKey: ['room'],
    queryFn: () => getRooms(),
  });
};

export default useRoom;
