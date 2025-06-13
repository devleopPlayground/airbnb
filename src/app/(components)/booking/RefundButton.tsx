'use client';

import { useSetAtom } from 'jotai';
import { useState } from 'react';

import { openModalAtom } from '@/atoms/modalAtom';
import type { BookingType } from '@/interface';

import RefundModal from './RefundModal';

type RefButtonProps = {
  canRefund: boolean;
  booking: BookingType;
};

const RefundButton = ({ booking, canRefund }: RefButtonProps) => {
  const openModal = useSetAtom(openModalAtom);
  const [isRefund, setIsRefund] = useState(false);

  const handleOpenModal = () => {
    openModal(<RefundModal booking={booking} setIsRefund={setIsRefund} />);
  };

  return (
    <section className="flex flex-col gap-4">
      {booking?.status === 'CANCEL' || isRefund ? (
        <button disabled className="disabled:bg-gray-300 px-5 py-2.5 cursor-pointer disabled:cursor-default">
          예약 취소 완료
        </button>
      ) : (
        <button
          disabled={!canRefund}
          type="button"
          onClick={handleOpenModal}
          className="bg-rose-600 hover:bg-rose-500 text-white rounded-md disabled:bg-gray-300 px-5 py-2.5 cursor-pointer disabled:cursor-default"
        >
          예약 취소하기
        </button>
      )}
    </section>
  );
};

export default RefundButton;
