import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getRoomsDetail } from '@/apis/rooms';
import RoomDetail from '@/app/(components)/roomDetail';

type RoomDetailComponentProps = {
  id: string;
};

const RoomDetailComponent = async ({ id }: RoomDetailComponentProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['room-detail', id],
    queryFn: () => getRoomsDetail(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <RoomDetail id={id} />
    </HydrationBoundary>
  );
};

export default RoomDetailComponent;
