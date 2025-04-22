import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Category from './(components)/category';
import RoomList from './(components)/room/RoomList';
import { getRooms } from '@/apis/rooms';

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['room'],
    queryFn: () => getRooms(),
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
