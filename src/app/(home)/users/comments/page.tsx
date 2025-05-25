'use client';

import React from 'react';

import CommentItem from '@/app/(components)/roomDetail/comment/CommentItem';
import { Loader, LoaderGrid } from '@/components/common/Loader';
import type { CommentType } from '@/interface';

import useComments from './(hooks)/useComments';

const CommentsPage = () => {
  const { myComments, isLoading, isFetching, ref, isFetchingNextPage, onNavigateRoom } = useComments();

  return (
    <>
      <div className="lg:px-16 md:px-8 sm:px-4 mb-20">
        <h1 className="lg:text-3xl text-2xl font-semibold mb-2">내가 작성한 댓글</h1>
        <p className="text-gray-500">내가 작성한 댓글 목록입니다.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 sm:px-4 md:px-8 lg:px-16">
        {isLoading || isFetching ? (
          <LoaderGrid counts={18} className="h-16" />
        ) : (
          myComments?.pages?.map((page, idx) => (
            <React.Fragment key={idx}>
              {page?.data?.map((comment: CommentType) => (
                <CommentItem key={comment.id} comment={comment} onNavigateRoom={onNavigateRoom} />
              ))}
            </React.Fragment>
          ))
        )}
      </div>
      {(isFetching || isFetchingNextPage) && <Loader />}
      <div className="w-full h-5 mt-4" ref={ref} />
    </>
  );
};

export default CommentsPage;
