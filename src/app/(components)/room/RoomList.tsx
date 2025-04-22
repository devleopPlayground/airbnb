'use client';

import GridLayout from './GridLayout';
import RoomItem from '.';
import useRoom from './hooks/useRoom';

const RoomList = () => {
  const { data } = useRoom();

  return <GridLayout>{data?.map((room) => <RoomItem key={room.id} {...room} />)}</GridLayout>;
};

export default RoomList;
