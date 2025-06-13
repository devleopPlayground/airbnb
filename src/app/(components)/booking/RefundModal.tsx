import type { SetStateAction } from 'jotai';
import { useSetAtom } from 'jotai';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

import { api } from '@/apis/httpClient';
import { closeModalAtom } from '@/atoms/modalAtom';
import type { BookingType } from '@/interface';

type RefundModalProps = {
  booking: BookingType;
  setIsRefund: React.Dispatch<SetStateAction<boolean>>;
};

const RefundModal = ({ booking, setIsRefund }: RefundModalProps) => {
  const closeModal = useSetAtom(closeModalAtom);

  const onClickRefundRoom = async () => {
    const response = await api.put('/api/bookings', {
      id: booking.id,
      status: 'CANCEL',
    });

    if (response.status == 200) {
      toast.success('해당 예약이 취소되었습니다.');
      setIsRefund(true);
      closeModal();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl">예약 취소</h1>
        <IoClose onClick={closeModal} className="cursor-pointer size-6" />
      </div>
      <p className="font-semibold mt-2">예약을 취소 하시겠습니까?</p>
      <p className="text-gray-600 text-sm mt-2">
        예약을 취소하면 재예약이 어려울 수 있습니다. 환불금은 예약 취소 후 2~3일 이후에 결제하신 카드로
        입금됩니다. 동의하시는 경우에만 아래의 버튼을 눌러 예약을 취소해주세요.
      </p>
      <button
        onClick={onClickRefundRoom}
        className="w-full py-2.5 cursor-pointer bg-rose-600 hover:bg-rose-500 text-white rounded-md mt-8"
      >
        예약 취소하기
      </button>
    </div>
  );
};

export default RefundModal;
