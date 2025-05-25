'use client';

import React from 'react';
import { IoClose } from 'react-icons/io5';

import { Loader, LoaderGrid } from '@/components/common/Loader';
import type { CommentType } from '@/interface';

import CommentItem from './CommentItem';
import useCommentList from './hooks/useCommentList';
import useCommentModalContent from './hooks/useCommentModalContent';

type CommentModalContentProps = {
  roomId?: string;
};

const CommentModalContent = ({ roomId }: CommentModalContentProps) => {
  const { closeModal } = useCommentList(roomId);
  const { ref, comments, isFetching, isFetchingNextPage, isLoading } = useCommentModalContent(roomId);

  return (
    <div className="w-full md:w-[520px] max-h-[70vh] overflow-auto scrollbar-hide">
      <div className="sticky top-0 bg-white">
        <div className="flex justify-between">
          <h1 className="font-semibold text-lg">후기 전체보기</h1>
          <button onClick={closeModal} className="cursor-pointer rounded-full p-1 hover:bg-black/20">
            <IoClose className="size-6" />
          </button>
        </div>
        <div className="text-[15px] mb-6 text-gray-600">전체 후기: {comments?.pages[0]?.totalCount}개</div>
      </div>
      <div className="mt-4 flex flex-col gap-6">
        {isLoading || isFetching ? (
          <LoaderGrid counts={7} className="h-28" />
        ) : (
          comments?.pages?.map((page, idx) => (
            <React.Fragment key={idx}>
              {page?.data?.map((comment: CommentType) => <CommentItem key={comment.id} comment={comment} />)}
            </React.Fragment>
          ))
        )}
      </div>
      {(isFetching || isFetchingNextPage) && <Loader className="mt-6" />}
      <div className="w-full h-5 mt-4" ref={ref} />
    </div>
  );
};

export default CommentModalContent;
