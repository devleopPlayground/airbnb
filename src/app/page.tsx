import { RoomType } from '@/interface';
import RoomItem from './(components)/room';
import GridLayout from './(components)/room/GridLayout';
import Category from './(components)/category';

const Home = async () => {
  const data: RoomType[] = await getRooms();

  return (
    <>
      <Category />
      <GridLayout>{data?.map((room) => <RoomItem key={room.id} {...room} />)}</GridLayout>
    </>
  );
};

export default Home;

const getRooms = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  return res.json();
};
