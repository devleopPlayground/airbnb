import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getRooms } from '@/apis/rooms';
import Category from '../(components)/category';
import RoomList from '../(components)/room/RoomList';

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['room'],
    queryFn: getRooms,
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Category />
      <HydrationBoundary state={dehydratedState}>
        <RoomList />
      </HydrationBoundary>
    </>
  );
};

export default Home;
