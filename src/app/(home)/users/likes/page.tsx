import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getLikeRooms } from '@/apis/likes';
import LikeRoomsList from '@/app/(components)/roomDetail/likes';
import { auth } from '@/auth';

const LikeRoomsPage = async () => {
  const queryClient = new QueryClient();
  const session = await auth();

  if (session?.user?.id) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['likeRooms', session.user.id],
      queryFn: () => getLikeRooms({ pageParam: 1 }),
      initialPageParam: 1,
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="lg:px-16 md:px-8 sm:px-4">
        <h1 className="lg:text-3xl text-2xl font-semibold mb-2">찜한 숙소 리스트</h1>
        <p className="text-gray-500">찜한 숙소 리스트입니다.</p>
      </div>
      <LikeRoomsList />
    </HydrationBoundary>
  );
};

export default LikeRoomsPage;
