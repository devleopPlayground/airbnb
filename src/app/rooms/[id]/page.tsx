import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getRoomsDetail } from '@/apis/rooms';
import RoomDetail from '@/app/(components)/roomDetail';
import type { ParamsProps } from '@/interface';

const RoomDetailPage = async ({ params }: ParamsProps) => {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['room-detail'],
    queryFn: () => getRoomsDetail(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <RoomDetail id={id} />
    </HydrationBoundary>
  );
};

export default RoomDetailPage;
