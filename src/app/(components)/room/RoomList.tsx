'use client';

import GridLayout from './GridLayout';
import RoomItem from '.';
import type { RoomType } from '@/interface';
import React from 'react';
import { Loader, LoaderGrid } from '@/components/common/Loader';
import useRoomList from './hooks/useRoomList';
import MapButton from '../map/MapButton';

const RoomList = () => {
  const { ref, rooms, isFetching, hasNextPage, isFetchingNextPage, isLoading, onNavigateMap } = useRoomList();

  return (
    <>
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid />
        ) : (
          rooms?.pages?.map((page, idx) => (
            <React.Fragment key={idx}>
              {page?.data?.map((room: RoomType) => <RoomItem key={room.id} {...room} />)}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      <MapButton onClick={onNavigateMap} />
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  );
};

export default RoomList;
