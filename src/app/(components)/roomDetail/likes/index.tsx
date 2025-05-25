'use client';

import React from 'react';

import { Loader, LoaderGrid } from '@/components/common/Loader';
import type { LikeType } from '@/interface';

import RoomItem from '../../room';
import GridLayout from '../../room/GridLayout';
import useLikes from './hooks/useLikes';

const LikeRoomsList = () => {
  const { likeRooms, isLoading, isFetching, isFetchingNextPage, ref } = useLikes();

  return (
    <>
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid className="h-[375px] sm:h-[340px] md:h-[366px] lg:h-[437px]" />
        ) : (
          likeRooms?.pages?.map((page, idx) => (
            <React.Fragment key={idx}>
              {page?.data?.map((likes: LikeType) => <RoomItem key={likes.room.id} {...likes.room} />)}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      {isFetchingNextPage && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  );
};

export default LikeRoomsList;
