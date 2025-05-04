import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getRooms } from '@/apis/rooms';
import Category from '../(components)/category';
import RoomList from '../(components)/room/RoomList';
import { Suspense } from 'react';
import { LoaderGrid } from '@/components/common/Loader';

const HomePage = async () => {
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
        <Suspense fallback={<LoaderGrid />}>
          <RoomList />
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default HomePage;
