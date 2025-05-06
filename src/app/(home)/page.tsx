import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getRooms } from '@/apis/rooms';
import { LoaderGrid } from '@/components/common/Loader';

import Category from '../(components)/category';
import RoomList from '../(components)/room/RoomList';

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
